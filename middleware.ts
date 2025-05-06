import { NextRequest, NextResponse } from 'next/server'
import { RequestLogger } from '@/lib/requestLogger'
import { v4 as uuidv4 } from 'uuid'


declare module 'next/server' {
    interface NextRequest {
        token?: string | null
    }
}

export async function middleware(request: NextRequest) {

    const start = Date.now()
    const requestId = uuidv4()

    // 执行后续处理
    const response = NextResponse.next()
    // 计算响应时间
    const duration = Date.now() - start

    response.headers.set('X-Request-ID', requestId)

    // 生成日志元数据
    const logMetadata = {
        requestId,
        duration,
        timestamp: new Date().toISOString()
        // method: request.method,
        // path: request.nextUrl.pathname,
        // userAgent: request.headers.get('user-agent'),
        // ip: request.ip || request.headers.get('x-real-ip')
    }

    RequestLogger.log(request, response, logMetadata)


    // token extractor
    // const authHeader = request.headers.get('authorization')
    // let token: string | null = null
    // if (authHeader) {
    //     const [type, value] = authHeader.split(' ')
    //     if (type.toLowerCase() === 'bearer' && value) {
    //         token = value // 提取不带前缀的 Token
    //     }
    // }

    // request.token = token

    // const [tokenType, tokenValue] = request.headers.get('authorization')?.split(' ')
    const splittedToken = request.headers.get('authorization')?.split(' ')

    if (!splittedToken) {
        request.token = null
    } else {
        const [tokenType, tokenValue] = splittedToken
        if (tokenType === "Bearer" && tokenValue) {
            request.token = tokenValue
        }
    }
    // splittedToken && const [tokenType, tokenValue] = splittedToken

    // if (tokenType === "Bearer" && tokenValue) {
    //     request.token = tokenValue
    // }

    return NextResponse.next()

    // return response

    // return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
    matcher: [
        // except static resources:
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ]

}

// // 生产环境日志分级
// if (process.env.NODE_ENV === 'production') {
//   console.log = (message: string) => {
//     // 对接 ELK/Sentry 等日志系统:ml-citation{ref="6" data="citationList"}
//     fetch(process.env.LOG_SERVICE_URL, {
//       method: 'POST',
//       body: message
//     })
//   }
// }


