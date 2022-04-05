require("module-alias/register") // active module-alias
//const config = require("./utils/config")
const config = require("@utils/config")
const app = require("./server/app")
const http = require("http")
//const logger = require("./utils/logger")
const logger = require("@utils/logger")

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
