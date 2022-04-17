require("dotenv").config()
const common = require("@root/config/common")

const PORT = process.env.PORT || 3003
const MONGO_URL =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

module.exports = { ...common, PORT, MONGO_URL }
