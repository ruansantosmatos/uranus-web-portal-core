import { ConfigFetch } from '@/types'

export async function Update({ login, config }: { login: string; config: ConfigFetch }) {
  try {
    const { request } = config
    const url = `/api/user/${login}`
    await fetch(url, request)
  } catch (error) {
    throw error
  }
}
