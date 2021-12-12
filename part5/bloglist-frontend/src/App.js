import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Notify from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
import ToggleButton from './components/ToggleButton'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({
    message: null,
    tag: null
  })
  const [user, setUser] = useState(null)
  const createBlogRef = useRef()

  const setNotify = (tag, message) => {
    setNotification({
      tag,
      message
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const sortBlog = (blog) => blog.sort((firstElem, secondElem) => secondElem.likes - firstElem.likes)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService
        .getUserBlog()
        .then(result => {
          setBlogs(sortBlog(result))
        })
    }
  }, [user])

  const handleLogin = async (username, password) => {
    try {
      const result = await loginService.logIn(username, password)
      setUser(result)
      blogService.setToken(result.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(result)
      )
    } catch (error) {
      setNotify('error', 'Invalid username or password')
    }
  }

  const loginForm = () => (
    <LoginForm handleLogin={handleLogin}/>
  )

  const handleCreateBlog = async (blogObject) => {
    createBlogRef.current.toggleVisibility()
    try {
      const request = await blogService.createBlog(blogObject)
      setBlogs(blogs.concat(request))
      if (request) {
        setNotify('success', `a new Blog ${request.title} was created!`)
      } else {
        setNotify('error', 'failed to add blog!')
      }
    } catch (error) {
      setNotify('error', error)
    }
  }

  const handleUpdateBlog = async (blogObject, id) => {
    try {
      const request = await blogService.updateBlog(blogObject, id)
      const updateBlog = blogs.map(blog => blog.id !== request.id ? blog : request)
      setBlogs(sortBlog(updateBlog))
      if (!request) {
        setNotify('error', 'something went wrong!')
      }
    } catch (error) {
      setNotify('error', error)
    }
  }

  const handleDeleteBlog = async (blog) => {
    const option = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (option) {
      try {
        const request = await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(blog => blog.id !== request.id))
        if (request) {
          setNotify('success', `${request.title} was deleted!`)
        } else {
          setNotify('success', 'Something went wrong!')
        }
      } catch (error) {
        setNotify('error', error)
      }
    }
  }

  const blogsForm = () => (
    <div>
      <h1>Hi! {user.name} </h1>
      <button
        type='submit'
        onClick={
          () => {
            window.localStorage.removeItem('loggedUser')
            window.location.reload(false)
          }
        }
      >Log out</button>

      <ToggleButton buttonLabel='Create Blog' hideLabel='Cancel' ref={createBlogRef}>
        <BlogForm createBlog={handleCreateBlog} />

      </ToggleButton>

      <h3>My Blogs</h3>
      {blogs.map(b =>
        <Blog
          key={b.id}
          blog={b}
          updateBlog={handleUpdateBlog}
          deleteBlog={handleDeleteBlog}
          user={user}
        />
      )
      }

    </div>
  )

  return (
    <div>
      {notification ? <Notify message={notification.message} tag={notification.tag} /> : null }
      {user === null ? loginForm() : blogsForm()}
    </div>
  )
}

export default App