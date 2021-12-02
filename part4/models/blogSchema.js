const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        }
    ],
})

blogSchema.set("toJSON", {
    transform: (document, object) => {
        object.id = object._id.toString()
        delete object._id
        delete object.__v
    },
})

module.exports = mongoose.model("Blog", blogSchema)
