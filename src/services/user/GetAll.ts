import { User } from '@/models'
import { buildQueryString } from '@/utils'
import { ConfigFetch, ResponseFetch } from '@/types'

export async function GetAll(config: ConfigFetch): Promise<ResponseFetch<User[]>> {
  try {
    const { request, searchParams } = config
    const url = `api/users${buildQueryString(searchParams)}`

    const response = await fetch(url, request)
    const data = (await response.json()) as ResponseFetch<User[]>
    return data
  } catch (error) {
    throw error
  }
}
