
const config = require("./utils/config")
const logger = require("./utils/logger")
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const blogsRouter = require("./controller/blogsRouter")
const userRouter = require("./controller/userRouter")
const loginRouter = require("./controller/loginRouter")
const middleware = require("./utils/middleware")
const mongoUrl = config.MONGO_URI

logger.info("connecting...", mongoUrl)

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUrl)
        logger.info("connected to DB!")
    } catch (error) {
        logger.error("failed to connect to DB!")
    }
}

connectDB()


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

if (process.env.NODE_ENV === 'test') {
    const resetRouter = require('./controller/resetRouter')
    app.use('/api/testing', resetRouter)
}
app.use("/api/blogs", middleware.userExtractor, blogsRouter)
app.use("/api/user", userRouter)
app.use("/api/login", loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app