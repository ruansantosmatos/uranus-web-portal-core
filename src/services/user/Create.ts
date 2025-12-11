import { ConfigFetch } from '@/types'

export async function Create({ config }: { config: ConfigFetch }) {
  try {
    const { request } = config
    const url = `/api/user`
    await fetch(url, request)
  } catch (error) {
    throw error
  }
}
