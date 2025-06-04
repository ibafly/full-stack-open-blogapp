import { NextRequest, NextResponse } from "next/server"
import { verifySessionOrToken } from "@/lib/dal"
import connectDb from "@/lib/dbConnect"

import Blog from "@/models/blog"

export async function GET(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
  await connectDb()
  const blog = await Blog.findById(id).populate("commentIds", "content")

  if (blog) {
    return NextResponse.json(blog, { status: 200 })
  } else {
    return NextResponse.json(null, { status: 400 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
  // option new for pass updated result instead of the founded one
  const result = await Blog.findByIdAndUpdate(id, body, { new: true })
  if (!result) {
    return NextResponse.json(null, { status: 400 })
  }

  return NextResponse.json(result, { status: 200 })

  // .then((result) => {
  //     console.log("come into put then", result);
  //     return NextResponse.json(result, { status: 200 })
  // })
  // .catch((err) => {
  //     console.log("err", err)
  //     return NextResponse.json(null, { status: 400 })
  // })
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const token = request.token
  const userFromToken = await verifySessionOrToken(token)
  if (!userFromToken) {
    return NextResponse.json(
      { error: "token missing or invalid" },
      { status: 400 }
    )
  }

  const { id } = await params
  await connectDb()
  const blog = await Blog.findById(id)

  if (!blog) {
    return NextResponse.json(
      null,
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
    { status: 200 } // 204 is not allowed, why?
  )
}