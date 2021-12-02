
const helper = require("../tests/test_helper")
const mongoose = require("mongoose")
const supertest = require("supertest")
const bcrypt = require("bcrypt")
const User = require("../models/userSchema")
const app = require("../app")
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    const passHash = await bcrypt.hash("secret", 10)

    const user = new User ({
        name: "secretAgent",
        username: "secretA",
        password: passHash
    })
    await user.save()
},100_000)

describe("when there is initially one user in db'", () => {
    test("returned as JSON ", async () => {
        await api.get("/api/user")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })
})


describe("when making a post request", () => {
    test("succeeds with a fresh credentials", async () => {
        const startCount = await helper.UsersInDb()

        const user = {
            name: "ninya",
            username: "ninafaith",
            password: "matadero0112"
        }
        await api
            .post("/api/user")
            .send(user)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        const endCount = await helper.UsersInDb()

        expect(endCount).toHaveLength(startCount.length + 1)

        const usernames = endCount.map(u => u.username)
        expect(usernames).toContain(user.username)



    })
    test("response with status 400 if missing parameters", async () => {
        const user = {
            name: "ninya",
            password: "matadero0112"
        }
        await api.post("/api/user").send(user)
            .expect(400)
    })
})



afterAll(async () => {
    await mongoose.connection.close()
})

