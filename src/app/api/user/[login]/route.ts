import { fetchToAPI } from '@/utils'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ login: string }> }) {
  const { login } = await params
  return fetchToAPI(`/uranus/core/users/${login}`, request)
}
