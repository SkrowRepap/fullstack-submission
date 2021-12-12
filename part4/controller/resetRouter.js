
const resetRouter = require('express').Router()
const Blogs = require('../models/blogSchema')
const Users = require('../models/userSchema')

resetRouter.post('/reset', async (request, response) => {
    await Blogs.deleteMany({})
    await Users.deleteMany({})

    response.status(204).end()
})

module.exports = resetRouter