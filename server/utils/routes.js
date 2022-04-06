const router = require('express').Router()
const middleware = require("../utils/middleware")
const usersRouter = require("../controllers/users")
const blogsRouter = require("../controllers/blogs")
const loginRouter = require("../controllers/login")

router.use("/api/users", usersRouter)
router.use("/api/login", loginRouter)
router.use("/api/blogs", middleware.userExtractor, blogsRouter)

module.exports = router

