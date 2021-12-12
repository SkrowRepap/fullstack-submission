
const blogsRouter = require("express").Router()
require("express-async-errors")
const jwt = require("jsonwebtoken")
const Blog = require("../models/blogSchema")
const User = require("../models/userSchema")
const config = require("../utils/config")


blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {name: 1, username: 1})
    response.json(blogs)
})

blogsRouter.get("/userBlogs", async (request, response) => {
    const user = await request.user
    const result = await Blog.find({user: {$in: [user.id]}}).populate('user', { name: 1, username: 1 })
    response.json(result)
})


blogsRouter.post("/", async (request, response) => {
    const body = request.body

    const user = await request.user

    if (!user) {
        return response.status(401).send({
            error: "invalid token"
        })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    })

    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)

    await user.save()

    response.json(result)

})

blogsRouter.delete("/:id", async (request, response) => {
    const user = await request.user

    if (!user) {
        return response.status(401).send({
            error: "invalid token"
        })
    }

    const blog = await Blog.findById(request.params.id)

    if (user._id.toString() !== blog.user.toString()) {
        return response.status(401).send({
            error: "unauthorized user"
        })
    }

    const result = await Blog.findByIdAndDelete(blog.id)
    response
        .status(200)
        .json(result)



})

blogsRouter.put("/:id", async (request, response) => {
    const body = request.body
    const id = request.params.id

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    const result = await Blog.findByIdAndUpdate(id, blog, { new:true })

    response.json(result)


})

module.exports = blogsRouter

