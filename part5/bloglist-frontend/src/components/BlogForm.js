import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [blogObject, setBlogObject] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handleCreateBlog = (event) => {
    event.preventDefault()
    createBlog(blogObject)
    // const blog = Object.keys(blogObject).forEach((i) => blogObject[i] = '')
    // setBlogObject(blog)
  }



  return (
    <div className="formDiv">
      <h2>Create Blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
                    Title
          <input
            type='text'
            value={blogObject.title}
            id='title'
            onChange={(event) => {
              setBlogObject({
                ...blogObject,
                title: event.target.value
              })
            }}
          />
        </div>

        <div>
                    Author
          <input
            type='text'
            value={blogObject.author}
            id='author'
            onChange={(event) => {
              setBlogObject({
                ...blogObject,
                author: event.target.value
              })
            }}
          />
        </div>

        <div>
                    Url
          <input
            type='text'
            value={blogObject.url}
            id='url'
            onChange={(event) => {
              setBlogObject({
                ...blogObject,
                url: event.target.value
              })
            }}
          />
        </div>
        <button type='submit' className='submit-button'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm
