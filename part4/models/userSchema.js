
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const User = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        minlength: 3
    },
    blogs: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Blog'
        }
    ],
})

User.set("toJSON", {
    transform: (document, object) => {
        object.id = object._id.toString()
        delete object._id
        delete object.__v
        delete object.password

    }
})

User.plugin(uniqueValidator)

module.exports = mongoose.model("User", User)