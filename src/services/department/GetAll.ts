import { Department } from '@/models'
import { buildQueryString } from '@/utils'
import { ConfigFetch, ResponseFetch } from '@/types'

export async function GetAll(config: ConfigFetch): Promise<ResponseFetch<Department[]>> {
  try {
    const { request, searchParams } = config
    const url = `api/department${buildQueryString(searchParams)}`

    const response = await fetch(url, request)
    const data = (await response.json()) as ResponseFetch<Department[]>
    return data
  } catch (error) {
    throw error
  }
}
