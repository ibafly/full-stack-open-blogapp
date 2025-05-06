// const logger = require("./utils/logger")
const mongoose = require("mongoose")

const MONGO_URL = process.env.MONGODB_URI
// logger.info("connecting to ", config.MONGO_URL)
console.info("connecting to ", MONGO_URL)

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URL, {
            bufferCommands: false, // Disable mongoose buffering
        })
            .then(mongoose => mongoose)
            .then(() => {
                console.info("connected to MongoDB")
            })
            .catch(err => {
                console.error("error connecting to MongoDB", err.message)
            })
    }

    cached.conn = await cached.promise;
    return cached.conn;

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
