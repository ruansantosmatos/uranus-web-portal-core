export type PaginationParams = {
  page: number
  limit: number
}

export function getPaginationParams(url?: string): PaginationParams {
  const defaultPage = 0
  const defaultLimit = 15
  const params = new URLSearchParams(url ? new URL(url).search : window.location.search)

  const page = Number(params.get('page') ?? defaultPage)
  const limit = Number(params.get('limit') ?? defaultLimit)

  return {
    page: isNaN(page) ? defaultPage : page,
    limit: isNaN(limit) ? defaultLimit : limit
  }
}
