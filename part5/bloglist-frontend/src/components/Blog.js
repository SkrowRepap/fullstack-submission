import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const verifyBlogByUser = () => {
    for (const key of Object.keys(blog)) {
      if (key === 'user') {
        console.log('verify', blog[key].map(b => b.includes(user.id)))
        return blog[key].map(b => b.includes(user.id))
      }
    }
  }

  const updateLikeObject = {
    ...blog,
    likes: blog.likes + 1
  }

  const handleUpdate = (event) => {
    event.preventDefault()
    updateBlog(updateLikeObject, blog.id)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    deleteBlog(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = {
    background: 'red',
    marginTop: 8
  }

  const showWhenHidden = { display: visible ? 'none' : '' }
  const hideWhenShown = { display: visible ? '' : 'none' }


  return (
    <div style = {blogStyle}>
      <div style = {showWhenHidden} id={blog.title.split(' ').join('-') +'-default-display'}>
        <h4 style={{ display: 'inline' }}> {blog.title} </h4>
        <button style = { { display: 'inline', marginLeft: 15 } } onClick={toggleVisibility} className='view-button' data-cy='view-button'> View </button>
      </div>

      <div style={hideWhenShown} className={blog.title.split(' ').join('-') + '-shown'}>
        <h4 style={{ display: 'inline' }}> {blog.title} </h4>
        <button style={{ display: 'inline', marginLeft: 8 }} onClick={toggleVisibility}> Hide </button>
        <p>Author: {blog.author}</p>
        <p>Url: {blog.url}</p>

        <div style={{ display: 'flex', 'alignItems': 'center' }} className='likes-container'>
          <p >Likes: <span id='likes-count'>{blog.likes}</span></p>
          <button style={{ marginLeft: 15, height: 22 }} onClick={handleUpdate} id={blog.title + '-like-button'} data-cy='like-button'> Like </button>
        </div>
        {verifyBlogByUser ? <button style={removeButtonStyle} onClick={handleDelete} id='delete-button' data-cy='remove-button'> Remove </button> : ''}

      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  // deleteBlog: PropTypes.func.isRequired,
  // user: PropTypes.object.isRequired,
}

export default Blog