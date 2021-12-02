
const _ = require("lodash")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length == 0 ? 0 : blogs.reduce((sum,current) => sum += current.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length == 0)
        return 0
    else {
        const maxLikes = blogs.reduce((max, next) => {
            return (max.likes > next.likes) ? max : next
        })

        const maxLikesObj = {
            title: maxLikes.title,
            author: maxLikes.author,
            likes: maxLikes.likes
        }

        return maxLikesObj
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length == 0)
        return 0
    else {
        const result = _(blogs)
            .groupBy("author")
            .mapValues(function (item, itemId) {
                var obj = { author: itemId }
                var count = _.countBy(item, "author")
                obj["blogs"] = Object.values(count)[0]
                return obj
            }).values()
        return result.reduce((prev,next) =>
            prev.blogs > next.blogs ? prev : next
        )
    }
}

const mostLikes = (blogs) => {
    if (blogs.length == 0)
        return 0
    else {
        const result = _.maxBy(blogs,"likes")
        return {
            author: result.author,
            likes: result.likes
        }
    }
}



module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}