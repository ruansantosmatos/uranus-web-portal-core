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
  const disableActions = total < limit

  const { visiblePages, hiddenPages, firstHiddenPage } = useMemo(() => {
    return getPagination({ total, limit })
  }, [total, limit])

  return (
    <Pagination pages={Math.round(total / limit)} className="mt-1.5 gap-x-3">
      <div>
        <p className="dark:text-light">
          {page} - {limit} de {total}
        </p>
      </div>
      <div>
        <NativeSelect defaultValue={'15'} onChange={handleLimit}>
          <NativeSelectOption value={'15'}>15</NativeSelectOption>
          <NativeSelectOption value={'45'}>45</NativeSelectOption>
          <NativeSelectOption value={'60'}>60</NativeSelectOption>
          <NativeSelectOption value={'100'}>100</NativeSelectOption>
        </NativeSelect>
      </div>
      <div>
        <PaginationPrevious handlePagination={handlePagination} disabled={disableActions} />
      </div>
      <PaginationContent className="hidden sm:inline-flex">
        {page <= firstHiddenPage &&
          visiblePages.map((item) => {
            return (
              <PaginationItem
                key={`page-item-${item}`}
                value={(item + 1).toString()}
                onClick={() => handlePagination((item + 1).toString())}
              >
                {item + 1}
              </PaginationItem>
            )
          })}
        {page > firstHiddenPage &&
          hiddenPages.map((item) => {
            return (
              <PaginationItem
                key={`page-item-${item}`}
                value={(item + 1).toString()}
                onClick={() => handlePagination((item + 1).toString())}
              >
                {item + 1}
              </PaginationItem>
            )
          })}
      </PaginationContent>
      <div>
        <PaginationNext handlePagination={handlePagination} disabled={disableActions} />
      </div>
    </Pagination>
  )
}
