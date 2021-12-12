
const bcrypt = require('bcrypt')
const UserRouter = require('express').Router()
const User = require('../models/userSchema')

UserRouter.get("/:username", async(request, response) => {
    const users = await User.find({username: request.params.username}).populate('blogs', { user: 0 })
    const usersJSON = users.map(u => u.toJSON())
    response.json(usersJSON)
})


UserRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate('blogs', {user: 0})

    const usersJSON = users.map(u => u.toJSON())

    response.json(usersJSON)
})

UserRouter.post("/", async (request, response) => {
    const body = request.body

    if(!body.username || !body.password) {
        response.status(400).json({
            error: 'username/password is missing'
        })
    }

    const saltRound = 10
    const password = await bcrypt.hash(body.password, saltRound)

    const newUser = new User ({
        name: body.name,
        username: body.username,
        password: password
    })

    const save = await newUser.save()

    response.json(save)

})

module.exports = UserRouter