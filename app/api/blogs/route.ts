import { NextRequest, NextResponse } from "next/server"
import { verifySessionOrToken } from "@/lib/dal"
import connectDb from "@/lib/dbConnect"

import Blog from "@/models/blog"
import User from "@/models/user"

// declare module 'next/server' {
//     interface NextRequest {
//         token?: string | null
//     }
// }

export async function GET(request: NextRequest) {
  await connectDb()
  const blogs = await Blog.find({}).populate("userId", "username name") // Blog.find({}) returns a Promise while await Blog.find({}) returns the result when find operation fullfilled // "username name" can be written as {username:1, name:1}
  console.log(blogs)
  //console.dir(blogs) // will show partial properties of an object
  //console.log(
  //  Object.getOwnPropertyNames(Blog),
  //  "===",
  //  Object.getOwnPropertyNames(Blog.prototype) // includes $__remove method
  //)

  return NextResponse.json(blogs, { status: 200 })
}

export async function POST(request: NextRequest) {

  const body = await request.json()

  if (!body.title && !body.url) {
    return NextResponse.json({ error: "title and url are missing" }, { status: 400 })

  }

  const token = request.token
  // console.log("token!!!:::", token);
  // verify token in request header or in cookie
  const userFromToken = token ? await verifySessionOrToken(token) : await verifySessionOrToken(null)
  console.log("blogsAPI:::userFromToken!!!:::", userFromToken)

  if (!userFromToken) {
    return NextResponse.json(
      { error: "token missing or invalid" },
      { status: 401 }
    )
  }

  await connectDb()
  // in api/login/route.ts what jwt signed: { username: user.username, id: user._id }
  const user = await User.findById(userFromToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    content: body.content,
    likes: body.likes || 0,
    userId: user._id,
  })

  // to-do: make blog.save() and user.save() an atomic operation (mongoDB transaction)
  const savedBlog = await blog.save()
  user.blogIds = user.blogIds.concat(savedBlog._id)
  await user.save({ validateBeforeSave: false })

  return NextResponse.json(
    await savedBlog.populate("userId", "username name"),
    { status: 201 }
  )
}

export async function DELETE(request: NextRequest,
  { params }: { params: Promise<{ id: String }> }
) {

  const { id } = await params
  const token = request.token

  await connectDb()
  const blog = await Blog.findById(id)
  if (!blog) {
    return NextResponse.json(
      { status: 400 }
    )
  }

  const userFromToken = await verifySessionOrToken(token)

  if (!userFromToken) {
    return NextResponse.json(
      { error: "token missing or invalid" },
      { status: 400 }
    )
  }

  if (!blog.userId.toString() === userFromToken.id.toString()) {
    return NextResponse.json(
      { error: "wrong user, no right to delete" },
      { status: 400 }
    )
  }

  await Blog.findByIdAndDelete(id)
  return NextResponse.json(
    null,
    { status: 204 }
  )
}

export async function PUT(request: NextRequest,
  { params }: { params: Promise<{ id: String }> }
) {

  const token = request.token
  const userFromToken = await verifySessionOrToken(token)
  if (!userFromToken) {
    return NextResponse.json(
      { error: "token missing or invalid" },
      { status: 401 }
    )
  }

  const { id } = await params
  const body = await request.json()
  await connectDb()
  const result = await Blog.findByIdAndUpdate(id, body, { new: true }) // option new for pass updated result instead of the founded one

  if (result) {
    return NextResponse.json(
      result,
      { status: 200 }
    )
  } else {
    return NextResponse.json(
      null,
      { status: 400 }
    )
  }
}
