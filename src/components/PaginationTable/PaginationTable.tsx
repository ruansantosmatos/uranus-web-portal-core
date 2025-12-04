import { getPagination } from '@/utils'
import { ChangeEvent, useMemo } from 'react'
import {
  Pagination,
  NativeSelect,
  NativeSelectOption,
  PaginationPrevious,
  PaginationContent,
  PaginationItem,
  PaginationNext
} from '@projectengine-team/hefesto'

export type PaginationTableProps = {
  page: number
  total: number
  limit: number
  handlePagination: (page: string) => void
  handleLimit: (event: ChangeEvent<HTMLSelectElement>) => void
}

export function PaginationTable({ page, total, limit, handleLimit, handlePagination }: PaginationTableProps) {
  const { totalPages, visiblePages, hiddenPages, firstHiddenPage } = useMemo(() => {
    return getPagination({ total, limit })
  }, [total, limit])

  const exceededItemLimit = total < limit

  const disablePrevAction = exceededItemLimit || page <= 0

  const disableNextAction = exceededItemLimit || page === totalPages - 1

  return (
    <Pagination className="mt-1.5 gap-x-3">
      <div>
        <p className="dark:text-light">
          {page + 1} - {limit} de {total}
        </p>
      </div>
      <div>
        <NativeSelect onChange={handleLimit} value={limit}>
          <NativeSelectOption value={'15'}>15</NativeSelectOption>
          <NativeSelectOption value={'45'}>45</NativeSelectOption>
          <NativeSelectOption value={'60'}>60</NativeSelectOption>
          <NativeSelectOption value={'100'}>100</NativeSelectOption>
        </NativeSelect>
      </div>
      <div>
        <PaginationPrevious disabled={disablePrevAction} onClick={() => handlePagination((page - 1).toString())} />
      </div>
      <PaginationContent className="hidden sm:inline-flex">
        {page < firstHiddenPage &&
          visiblePages.map((item) => {
            return (
              <PaginationItem
                isActive={page === item}
                key={`page-item-${item}`}
                onClick={() => handlePagination(item.toString())}
              >
                {item + 1}
              </PaginationItem>
            )
          })}
        {page >= firstHiddenPage &&
          hiddenPages.map((item) => {
            return (
              <PaginationItem
                isActive={page === item}
                key={`page-item-${item}`}
                onClick={() => handlePagination(item.toString())}
              >
                {item + 1}
              </PaginationItem>
            )
          })}
      </PaginationContent>
      <div>
        <PaginationNext disabled={disableNextAction} onClick={() => handlePagination((page + 1).toString())} />
      </div>
    </Pagination>
  )
}
