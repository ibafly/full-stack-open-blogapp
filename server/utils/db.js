const config=require("./config")
const mongoose=require("mongoose")

mongoose.connect(config.MONGO_URL)
