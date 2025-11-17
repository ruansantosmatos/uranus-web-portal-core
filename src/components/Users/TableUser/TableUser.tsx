'use client'
import { User } from '@/models'
import { STATUS } from '@/constants'
import { ConfigFetch } from '@/types'
import { ServicesUsers } from '@/services/users'
import { getHeadersFetch, getPagination } from '@/utils'
import { useEffect, useMemo, useState } from 'react'
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Pagination,
  TableHeader,
  PaginationNext,
  PaginationItem,
  PaginationContent,
  PaginationPrevious
} from '@projectengine-team/hefesto'

export function TableUser() {
  const [page, setPage] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [limit, setLimit] = useState<number>(15)
  const [users, setUsers] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)

  const headers = getHeadersFetch()

  const configRequest: RequestInit = { method: 'GET', headers: headers }

  const { visiblePages, hiddenPages, firstHiddenPage } = useMemo(() => {
    return getPagination({ total, limit })
  }, [total, limit])

  useEffect(() => { useFetchUsers() }, [currentPage])

  function handlePagination(page: string) {
    setPage(Number(page))
    setCurrentPage(Number(page) - 1)
    // useFetchUsers()
  }

  async function useFetchUsers() {
    try {
      const config: ConfigFetch = { request: configRequest, page: currentPage, limit: limit }
      const response = await ServicesUsers.GetAllUsers(config)

      const users = response.data
      console.log('USUERS ==>', users)
      const totalMetada = response.metadata.total

      setUsers(users)
      setTotal(totalMetada)
    } catch (error) {
      console.log('falha')
      // alert('Falha na busca dos usuários')
    }
  }

  return (
    <div className="flex flex-col gap-y-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome Completo</TableHead>
            <TableHead>Login</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Grupos</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.login}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.departments?.name ?? '--'}</TableCell>
                <TableCell className={user.active ? STATUS.active.color : STATUS.inactive.color}>
                  {user.active ? STATUS.active.label : STATUS.inactive.label}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <div className="w-full">
        <Pagination pages={Math.round(total / limit)} className="h-10 gap-x-3">
          <p>
            {page} - {limit} de {total}
          </p>
          <PaginationPrevious handlePagination={handlePagination} />
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
          <PaginationNext handlePagination={handlePagination} />
        </Pagination>
      </div>
    </div>
  )
}
