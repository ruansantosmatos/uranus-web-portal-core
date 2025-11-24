export function buildQueryString(searchParams?: Record<string, any>): string {
  if (!searchParams || Object.keys(searchParams).length === 0) {
    return ''
  }

  const filteredParams = Object.fromEntries(
    Object.entries(searchParams)
      .filter(([_, value]) => value != null)
      .map(([key, value]) => [key, String(value)])
  )

  const queryString = new URLSearchParams(filteredParams).toString()
  return queryString ? `?${queryString}` : ''
}
