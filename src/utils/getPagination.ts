export type PaginationInput = {
  total: number
  limit: number
}

export interface PaginationResult {
  visiblePages: number[]
  hiddenPages: number[]
  firstHiddenPage: number
}

export function getPagination({ total, limit }: PaginationInput): PaginationResult {
  const totalPages = Math.ceil(total / limit)
  const half = Math.ceil(totalPages / 2)

  const visible = Array.from({ length: half }, (_, i) => i)
  const hidden = Array.from({ length: totalPages - half }, (_, i) => i + half)

  return { visiblePages: visible, hiddenPages: hidden, firstHiddenPage: hidden[0] }
}
