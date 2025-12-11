import { ConfigFetch } from '@/types'

export type UpdatePasswordProps = {
  login: string
  config: ConfigFetch
}

export async function UpdatePassword({ login, config }: UpdatePasswordProps): Promise<void> {
  try {
    const { request } = config
    const url = `/api/user/${login}/password`
    await fetch(url, request)
  } catch (error) {
    throw error
  }
}
