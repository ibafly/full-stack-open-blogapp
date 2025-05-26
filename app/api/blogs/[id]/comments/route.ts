import { NextRequest, NextResponse } from "next/server"
import { verifySessionOrToken } from "@/lib/dal"
const Blog = require("@/models/blog")
const Comment=require("@/models/comment")

export async function GET(request: NextRequest,
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
    const blog = await Blog.findById(id).populate("commentIds", "content")

    if (blog) {
        return NextResponse.json(
            blog.commentIds,
            { status: 200 }
        )
    } else {
        return NextResponse.json(
            { error: "token missing or invalid" },
            { status: 400 }
        )
    }

}

export async function POST(request: NextRequest,
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
    // const body = request.body
    const body = await request.json()

    if (!body.content) {
        return NextResponse.json(
            { error: "comment content missing" },
            { status: 400 }
        )
    }

    const blog = await Blog.findById(id)

    if (!blog) {
        return NextResponse.json(
            { error: "no blog found" },
            { status: 400 }
        )
    }

    const comment = new Comment({ content: body.content })
    const savedComment = await comment.save()
    blog.commentIds = blog.commentIds.concat(savedComment._id)
    await blog.save()

    return NextResponse.json(
        savedComment,
        { status: 201 }
    )
}

