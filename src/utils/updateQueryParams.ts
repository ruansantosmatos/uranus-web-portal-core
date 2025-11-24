export function updateQueryParams(params: Record<string, string | number | null | undefined>) {
  const url = new URL(window.location.href)
  const searchParams = url.searchParams

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      searchParams.delete(key)
    } else {
      searchParams.set(key, String(value))
    }
  })

  const newUrl = `${url.pathname}?${searchParams.toString()}`
  window.history.replaceState({}, '', newUrl) 
}
