import { UserByLogin } from '@/types'
import { ConfigFetch, ResponseFetch } from '@/types'

type GetByLoginProps = {
  login: string
  config: ConfigFetch
}

export async function GetByLogin({ login, config }: GetByLoginProps): Promise<ResponseFetch<UserByLogin>> {
  try {
    const { request } = config
    const url = `/api/user/${login}`

    const response = await fetch(url, request)
    const data = (await response.json()) as ResponseFetch<UserByLogin>
    return data
  } catch (error) {
    throw error
  }
}
