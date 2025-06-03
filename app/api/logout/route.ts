import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { deleteCookie } from "cookies-next/server"


export async function POST(request: Request) {
  await deleteCookie("auth-token", { cookies })
  console.log("deleted auth-token cookie")
  await deleteCookie("logged-user", { cookies })
  console.log("deleted logged-user cookie")

  return NextResponse.json(
    null,
    { status: 200 }
  )
}