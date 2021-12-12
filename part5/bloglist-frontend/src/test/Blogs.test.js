
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'
import Togglable from '../components/ToggleButton'
import BlogForm from '../components/BlogForm'

const blog = {
  title: 'test1',
  author: 'test1',
  url: 'test1.com',
  likes: 20
}

describe('<Blogs/> tests:', () => {
  // eslint-disable-next-line quotes
  test(`renders the blog's title and author by default`, () => {
    const mockHandler = jest.fn()
    const component = render (
      <Blog blog={blog}
        updateBlog={mockHandler}/>
    )
    const div = component.container.querySelector('.defaultDisplay')
    expect(div).not.toHaveTextContent('test1.com')
  })

  test('like button is called twice', () => {
    const mockHandler = jest.fn()

    const component = render (
      <Blog blog={blog}
        updateBlog={mockHandler}/>
    )
    const button = component.container.querySelector('.likeButton')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

describe('<BlogForm/> test:', () => {
  test('event handler it received as props with the right details when a new blog is created', () => {
    const mockHandler = jest.fn()
    const component = render (
      <BlogForm createBlog={mockHandler} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'test title' }
    })

    fireEvent.change(author, {
      target: { value: 'test author' }
    })

    fireEvent.change(url, {
      target: { value: 'test.url.com' }
    })

    fireEvent.submit(form)
    console.log(mockHandler.mock.calls)
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('test title')
    expect(mockHandler.mock.calls[0][0].author).toBe('test author')
    expect(mockHandler.mock.calls[0][0].url).toBe('test.url.com')
  })
})