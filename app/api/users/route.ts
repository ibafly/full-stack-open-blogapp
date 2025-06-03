import { NextRequest, NextResponse } from "next/server"
import connectDb from "@/lib/dbConnect"
import { verifySessionOrToken } from "@/lib/dal"

const bcrypt = require("bcrypt")
import User from "@/models/user"

export async function GET(request: Request) {

  const users = await User.find({}).populate("blogIds", {
    title: 1,
    url: 1,
    author: 1,
  })

  return NextResponse.json(users, { status: 200 })
}


export async function POST(request: Request) {

  const body = await request.json()

  const passwordIsValid = body.password && body.password.length >= 3
  if (!passwordIsValid) {

    return NextResponse.json(
      { error: "password is missing or less than 3 characters" },
      { status: 400 })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  await newUser.save()
  return NextResponse.json(newUser, { status: 201 })

}


export async function PUT(request: NextRequest) {

  const userFromToken = await verifySessionOrToken(request.token)
  if (!userFromToken) {
    return NextResponse.json(
      { error: "token missing or invalid" },
      { status: 401 }
    )
  }

  const body = await request.json()

  const newPasswordIsValid = body.password && body.password.length >= 3
  if (!newPasswordIsValid) {
    return NextResponse.json(
      { error: "password is missing or less than 3 characters" },
      { status: 400 })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const id = userFromToken.id
  const updatedUser = await User.findByIdAndUpdate(id, body, { new: true }) // option new for return updated result instead of the founded one
  if (updatedUser) {
    return NextResponse.json(updatedUser, { status: 201 })
  } else {
    return NextResponse.json({ status: 400 })
  }

}

export async function DELETE(request: Request) {
  await User.deleteMany({})
  return NextResponse.json(null, { status: 204 })
}
