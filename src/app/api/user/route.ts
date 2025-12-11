import { fetchToAPI } from '@/utils'
import { NextRequest } from 'next/server'

export function GET(request: NextRequest) {
  return fetchToAPI('/uranus/core/users', request)
}

export function POST(request: NextRequest) {
  return fetchToAPI('/uranus/core/users', request)
}
