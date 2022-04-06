const express = require("express")
require("express-async-errors") // function as try-catch wrapped around async/await
const config = require("./utils/config")
const logger = require("./utils/logger")
const routes = require("./utils/routes")
const middleware = require("./utils/middleware")

const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

logger.info("connecting to ", config.MONGO_URL)

mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch(err => {
    logger.error("error connecting to MongoDB", err.message)
  })

app.use(cors())
//app.use(express.static("build"))
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use(routes)

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("../controllers/testing")
  app.use("/api/testing", testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
