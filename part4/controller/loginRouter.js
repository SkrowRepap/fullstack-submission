
const LoginRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/userSchema")
const config = require("../utils/config")

LoginRouter.post("/", async (request, response) => {
    const body = request.body
    const username = body.username
    const pass = body.password


    const user = await User.findOne( {username: username} )

    const passHash = user !== null
        ? await bcrypt.compare(pass,user.password)
        : false

    if (!(user && passHash)) {
        return response.status(401).send({
            error: "invalid user/password"
        })
    }

    const userToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userToken, config.SECRET_KEY)

    response
        .status(200)
        .send({
            token,
            username: user.username,
            name: user.name
        })


})

module.exports = LoginRouter

