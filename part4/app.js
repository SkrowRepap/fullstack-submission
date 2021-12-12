
const http = require("http")
const app = require("./index")
const config = require("./utils/config")
const logger = require("./utils/logger")
const PORT = config.PORT

const server = http.createServer(app)

server.listen(PORT, () => {
    logger.info(`Server running on PORT ${PORT}`)
})


module.exports = app
