import { fetchToAPI } from '@/utils'
import { NextRequest } from 'next/server'

export function GET(request: NextRequest) {
  return fetchToAPI('/uranus/core/groups', request)
}
