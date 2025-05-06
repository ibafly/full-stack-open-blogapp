import 'server-only'

import { cookies } from 'next/headers'
// import { decrypt } from '@/app/lib/session'
import { getCookie, getCookies } from "cookies-next/server";
const jwt = require("jsonwebtoken")
import { redirect } from "next/navigation";
import { cache } from "react";

export const verifySessionOrToken = cache(async (tokenValueFromRequest?: string | null) => {


    //   const cookie = (await cookies()).get('session')?.value
    const token = tokenValueFromRequest ? tokenValueFromRequest : await getCookie("auth-token", { cookies })
    //   const session = await decrypt(cookie)
    const allCookies = await getCookies({ cookies })
    console.log("allCookies!!!:::", allCookies);

    console.log("tokenValueFromRequest!!!:::", tokenValueFromRequest);
    console.log("tokenInV!!!:::", token);
    const userFromToken = await jwt.verify(token, process.env.SECRET_KEY)
    console.log("userFromToken!!!:::", userFromToken);

    if (!userFromToken?.id) {
        redirect('/')
    }

    console.log("In verifySession, detected userId in session/token")
    // return { isAuth: true, userId: session.userId }
    return userFromToken
})

