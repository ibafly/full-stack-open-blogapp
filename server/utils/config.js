const common = require("@root/config/common")

const PORT = process.env.PORT || 3000
const MONGO_URL =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

console.log("MONGO_URL: ", MONGO_URL, "process.env.TEST_MONGODB_URI: ", process.env.TEST_MONGODB_URI)

module.exports = { ...common, PORT, MONGO_URL }
