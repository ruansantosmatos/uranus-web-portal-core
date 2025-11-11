import { NextRequest } from 'next/server'

/**
 * Faz proxy de uma requisição Next.js API Route para o Gateway configurado via headers.
 *
 * @param path Caminho relativo a ser anexado à URL base do Gateway.
 * @param request Objeto NextRequest original.
 * @returns Response vinda da API de destino.
 */
export async function fetchToAPI(path: string, request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams.toString()
    const gatewayUrl = request.headers.get('X-GatewayUrl') || ''
    const url = new URL(path + (search ? `?${search}` : ''), gatewayUrl)

    const headers = new Headers()
    const body = request.body ? JSON.stringify(await request?.json()) : null

    const allowedHeaders = [
      'authorization',
      'x-tenant',
      'cookie',
      'content-type',
      'accept',
      'accept-language',
      'user-agent'
    ]

    request.headers.forEach((value, key) => {
      if (allowedHeaders.includes(key.toLowerCase())) {
        headers.set(key, value)
      }
    })

    const options: RequestInit = {
      method: request.method,
      headers: headers,
      body: body
    }

    const response = await fetch(url, options)
    return response
  } catch (err) {
    throw `fetchToAPI error: ${err}`
  }
}
