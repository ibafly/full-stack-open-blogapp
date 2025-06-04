// const logger = require("./utils/logger")
import mongoose from "mongoose"

declare global {
  var mongoose: { conn: any; promise: any } | undefined
}

const MONGO_URL = process.env.MONGODB_URI
// logger.info("connecting to ", config.MONGO_URL)
console.info("connecting to ", MONGO_URL)

let cached = global.mongoose || { conn: null, promise: null }

export default async function dbConnect() {

  if (cached.conn) return cached.conn
  if (!cached.promise && MONGO_URL) {
    cached.promise = mongoose.connect(MONGO_URL, {
      bufferCommands: false, // Disable mongoose buffering
      maxPoolSize: 10, // 连接池大小
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      heartbeatFrequencyMS: 10000 // 每10秒心跳检测
    })
      .then(mongoose => mongoose)
      .then(() => {
        console.info("connected to MongoDB")
      })
      .catch(err => {
        console.error("error connecting to MongoDB", err.message)
      })
  }

  cached.conn = await cached.promise
  return cached.conn

}



// mongoose
//     // .connect(config.MONGO_URL, {
//     .connect(MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         // logger.info("connected to MongoDB")
//         console.info("connected to MongoDB")
//     })
//     .catch(err => {
//         // logger.error("error connecting to MongoDB", err.message)
//         console.error("error connecting to MongoDB", err.message)
//     })
