
const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("../tests/test_helper")
const app = require("../app")
const Blogs = require("../models/blogSchema")
const api = supertest(app)



beforeEach(async () => {
    await Blogs.deleteMany({})
    await Blogs.insertMany(helper.blogs)
},100_000)

describe("blogs:", () => {

    test("returned as JSON ", async () => {
        await api.get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("correct length ", async () => {
        const blogs = await api.get("/api/blogs")
        expect(blogs.body).toHaveLength(helper.blogs.length)
    })

    test("has an id property", async () => {
        const blogs = await api.get("/api/blogs")
        expect(blogs.body[0].id).toBeDefined()
    })

    test("can make a post request with proper token", async () => {
        const user = {
            username: "secretA",
            password: "secret"
        }
        const userToken = await api.post("/api/login").send(user).expect(200)
        const token = userToken.body.token

        const blog = {
            "title": "test",
            "author": "testName",
            "url": "test.url",
            "likes": 10,
        }

        const result = await
        api
            .post("/api/blogs")
            .set("Authorization", `bearer ` + token)
            .send(blog)

        expect(Blogs.findById(result.body.id)).toBeDefined()
    })

    test("response with a status 401 if token is missing", async () => {
        const user = {
            username: "secretA",
            password: "secret"
        }
        const userToken = await api.post("/api/login").send(user).expect(200)
        const token = null

        const blog = {
            "title": "test",
            "author": "testName",
            "url": "test.url",
            "likes": 10,
        }

        const result = await
        api
            .post("/api/blogs")
            .set("Authorization", `bearer ` + token)
            .send(blog)
            .expect(401)
    })

    test("default value of likes is 0", async () => {
        const blog = {
            "title": "test",
            "author": "testName",
            "url": "test.url",
        }
        const result = await api.post("/api/blogs").send(blog)
        expect(result.body.likes).toBe(0)
    })

    test("response 400 if title and url are missing", async () => {
        const blog = {
            "author": "testName",
            "likes": 100
        }
        await api.post("/api/blogs").send(blog)
            .expect(400)
    })
})

describe("viewing a specific blog: ", () => {

    test("succeeds with a valid id", async () => {

        const blogStart = await helper.BlogsInDb()
        const blog = blogStart[0]

        const result = await api.get(`/api/blogs/${blog.id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        const resultJSON = JSON.parse(JSON.stringify(blog))

        expect(result.body).toEqual(resultJSON)

    })

    test("response with 400 if blog does not exist", async () => {
        const id = 'a1b2c3d45e'
        console.log(id)
        await api.get(`/api/blogs/${id}`)
            .expect(400)
    },10_000)
})

describe("deleting a blog", () => {
    test("respondse with status 200 if succesfully deleted", async () => {
        const blogStart = await helper.BlogsInDb()
        const blog = blogStart[0]

        const result = await api.delete(`/api/blogs/${blog.id}`)
            .expect(200)
    })
})

describe("updating a specific blog: ", () => {
    test("updates with a valid id", async () => {

        const blogStart = await helper.BlogsInDb()
        const blog = blogStart[0]

        const updateBlog = {
            ...blog,
            likes: 50,
        }

        const result = await api.put(`/api/blogs/${blog.id}`)
            .send(updateBlog)
            .expect(200)

        const resultJSON = JSON.parse(JSON.stringify(updateBlog))

        expect(result.body).toEqual(resultJSON)

    })

})

afterAll(async () => {
    await mongoose.connection.close()
},100_000)

