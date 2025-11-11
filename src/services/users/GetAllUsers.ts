import { User } from '@/models'
import { ConfigFetch, ResponseFetch } from '@/types'

export async function GetAllUsers(config: ConfigFetch): Promise<ResponseFetch<User[]>> {
  try {
    const { request } = config
    const response = await fetch('api/users', request)

    const data = (await response.json()) as ResponseFetch<User[]>
    return data
  } catch (error) {
    throw error
  }
}
