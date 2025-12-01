'use client'
import { User } from '@/models'
import { STATUS } from '@/constants'
import { StatusFetch } from '@/types'
import { useRouter } from 'next/navigation'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Skeleton, Table } from '@projectengine-team/hefesto'

export type TableUserProps = {
  users: User[]
  limit: number
  statusFetch: StatusFetch
}

export function TableUser({ users, limit, statusFetch }: TableUserProps) {
  const route = useRouter()

  const skeletonsTableRows = Array.from({ length: limit }, (_, i) => i)

  function handleOnclick(login: string) {
    const searchParams = new URLSearchParams(window.location.search).toString()
    route.push(`/user/${login}?${searchParams}`)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome Completo</TableHead>
          <TableHead>Login</TableHead>
          <TableHead className="hidden md:table-cell">Email</TableHead>
          <TableHead className="hidden lg:table-cell">Grupos</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 && statusFetch === 'success' && (
          <TableRow>
            <TableCell colSpan={5} className="font-bold">
              Nenhum resultado encontrado
            </TableCell>
          </TableRow>
        )}
        {statusFetch === 'loading' &&
          skeletonsTableRows.map((_, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton />
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <Skeleton />
                </TableCell>
              </TableRow>
            )
          })}
        {users.length > 0 &&
          statusFetch === 'success' &&
          users.map((user) => {
            return (
              <TableRow key={user.id} onClick={() => handleOnclick(user.login as string)}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.login}</TableCell>
                <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {user.groups?.map((value) => value.name).join(' / ') ?? '--'}
                </TableCell>
                <TableCell className={user.active ? STATUS.active.color : STATUS.inactive.color}>
                  {user.active ? STATUS.active.label : STATUS.inactive.label}
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
