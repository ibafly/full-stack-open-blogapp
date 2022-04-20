const express = require("express")
require("express-async-errors") // function as try-catch wrapped around async/await
// const config = require("./utils/config")
// const logger = require("./utils/logger")
const routes = require("./utils/routes")
const middleware = require("./utils/middleware")

const app = express()
const cors = require("cors")
// const mongoose = require("mongoose")
//
// logger.info("connecting to ", config.MONGO_URL)
//
// mongoose
//   .connect(config.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     logger.info("connected to MongoDB")
//   })
//   .catch(err => {
//     logger.error("error connecting to MongoDB", err.message)
//   })

app.use(cors())
//app.use(express.static("build"))
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use(routes)

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing")
  app.use("/testing", testingRouter) // cypress need this route to do end to end test, so before run `yarn test:e2e`, run `yarn start:test`. But no need to run `yarn start:test` before backend test `yarn test` bc we use supertest that will start the server automatically only when jest tests, and down the server when tests end.
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
