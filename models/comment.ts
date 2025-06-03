import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
  content: String,
})

commentSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  },
})

export default mongoose.models.Comment || mongoose.model("Comment", commentSchema)
