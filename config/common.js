require("dotenv").config()

const inProduction = process.env.NODE_ENV === "production"

module.exports = {
  inProduction
}
