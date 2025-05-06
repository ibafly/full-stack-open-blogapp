// src/lib/logger.ts
export class RequestLogger {
  static log(request: NextRequest, response: Response, logMetadata) {
    const contentType = response.headers.get('content-type')
    const logLevel = response.status >= 500 ? 'error' : 'info'

    // 敏感信息过滤
    const sanitizedHeaders = { ...request.headers }
    delete sanitizedHeaders['authorization']
    delete sanitizedHeaders['cookie']

    // 日志分级处理
    console[logLevel](JSON.stringify({
      type: 'request',
      method: request.method,
      path: request.nextUrl.pathname,
      userAgent: request.headers.get('user-agent'),
      ip: request.ip || request.headers.get('x-real-ip'),
      body: request.body,
      status: response.status,
      responseType: contentType,
      headers: sanitizedHeaders,
      ...logMetadata
    }))
  }
}

