import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { setCookie } from "cookies-next/server"
import connectDb from "@/lib/dbConnect"

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

import User from "@/models/user"

interface LoginRequest extends NextRequest {
  username: string;
  password: string;
}

export async function POST(request: LoginRequest) {
  await connectDb()
  // const body = request.body
  const body = await request.json()

  const user = await User.findOne({ username: body.username })
  const bothRight = user
    ? await bcrypt.compare(body.password, user.passwordHash)
    : false

  if (!bothRight) {
    return NextResponse.json(
      { error: "invalid username or password" },
      { status: 401 }
    )
  }

  const userForToken = { username: user.username, id: user._id }
  const token = await jwt.sign(userForToken, process.env.SECRET_KEY)
  // httpOnly cookie can only be set on the server side
  await setCookie("auth-token", token, {
    cookies, //it's a function
    maxAge: 60 * 60 * 24,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true
    // path: "/"
    // path: "/api"
  })


  const loggedUser = {
    username: user.username,
    name: user.name,
    userId: user._id
  }

  await setCookie("logged-user", JSON.stringify(loggedUser), {
    cookies,
    maxAge: 60 * 60 * 24,
    secure: process.env.NODE_ENV === "production",
    httpOnly: false
  })
  
  return NextResponse.json(
    { userId: user._id, username: user.username, name: user.name },
    { status: 200 }
  )

}









