'use client'
import { useRouter } from 'next/navigation'
import { Routes, STATUS } from '@/constants'
import { ServicesUser } from '@/services/user'
import { CircleAlert, ListFilterIcon, X } from 'lucide-react'
import { ServicesGroup } from '@/services/group'
import { Department, Group, User } from '@/models'
import { ConfigFetch, StatusFetch } from '@/types'
import { ServicesDepartment } from '@/services/department'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { getHeadersFetch, getPagination, updateQueryParams } from '@/utils'
import {
  Filter,
  Skeleton,
  Navigation,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  NavigationItem,
  NavigationLink,
  NavigationList,
  NavigationSeparator,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  FilterTrigger,
  FilterValue,
  FilterWrapper,
  FilterClear,
  FilterClose,
  FilterContent,
  FilterFooter,
  FilterForm,
  FilterHeader,
  FilterInput,
  FilterItem,
  FilterLabel,
  FilterSelect,
  FilterSubmit,
  FilterTitle,
  NativeSelect,
  NativeSelectOption
} from '@projectengine-team/hefesto'

export default function Users() {
  const route = useRouter()
  const [page, setPage] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [limit, setLimit] = useState<number>(15)
  const [users, setUsers] = useState<User[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [groupsError, setGroupsError] = useState<boolean>(false)
  const [departments, setDepartments] = useState<Department[]>([])
  const [statusFetch, setStatusFetch] = useState<StatusFetch>('none')
  const [departmentError, setDepartmentError] = useState<boolean>(false)

  const headers = getHeadersFetch()

  const configRequest: RequestInit = { method: 'GET', headers: headers }

  const skeletonsTableRows = Array.from({ length: limit }, (_, i) => i)

  useEffect(() => { loadDefaultUseFetch() }, [])

  useEffect(() => { useFetchUsers() }, [currentPage, limit])

  const { visiblePages, hiddenPages, firstHiddenPage } = useMemo(() => {
    return getPagination({ total, limit })
  }, [total, limit])

  function loadDefaultUseFetch() {
    useFetchGroups()
    useFetchDepartments()
  }

  function handleRoute(path: string) {
    route.push(path)
  }

  function handleFilters() {
    useFetchUsers()
  }

  function returnDepartments() {
    return departments.map((item) => ({ value: item.name, label: item.name }))
  }

  function returnGroups() {
    return groups.map((item) => ({ value: item.name, label: item.name }))
  }

  function handleLimit(event: ChangeEvent<HTMLSelectElement>) {
    const defaultPage = 0
    const value = parseInt(event.target.value)

    setLimit(value)
    setCurrentPage(defaultPage)
  }

  function handlePagination(page: string) {
    const currentPage = Number(page) - 1
    setPage(Number(page))
    setCurrentPage(currentPage)
  }

  async function useFetchDepartments() {
    try {
      const config: ConfigFetch = { request: configRequest }
      const response = await ServicesDepartment.GetAll(config)

      const data = response.data
      setDepartments(data)
    } catch (error) {
      setDepartmentError(true)
    }
  }

  async function useFetchGroups() {
    try {
      const config: ConfigFetch = { request: configRequest }
      const response = await ServicesGroup.GetAll(config)

      const data = response.data
      setGroups(data)
    }
    catch (error) {
      setGroupsError(true)
    }
  }

  async function useFetchUsers() {
    try {
      setStatusFetch('loading')
      updateQueryParams({ page: currentPage, limit: limit })

      const urlSearchParams = new URLSearchParams(window.location.search)
      const params: Record<string, string> = {}

      urlSearchParams.forEach((value, key) => params[key] = value)
      const config: ConfigFetch = { request: configRequest, searchParams: params }
      const response = await ServicesUser.GetAll(config)

      const users = response.data
      const totalMetada = response.metadata.total

      setUsers(users)
      setTotal(totalMetada)
      setTimeout(() => { setStatusFetch('success') }, 500)
    } catch (error) {
      setStatusFetch('error')
    }
  }

  return (
    <section className="h-full w-full overflow-y-scroll">
      <div className="">
        <Navigation className="h-12">
          <NavigationList className="h-full items-center px-5">
            <NavigationItem>
              <NavigationLink onClick={() => handleRoute(Routes.root.path)}>Home</NavigationLink>
            </NavigationItem>
            <NavigationSeparator />
            <NavigationItem>
              <NavigationLink className="cursor-auto">Contas</NavigationLink>
            </NavigationItem>
            <NavigationSeparator />
            <NavigationItem>
              <NavigationLink onClick={() => handleRoute(Routes.users.path)}>Usuários</NavigationLink>
            </NavigationItem>
          </NavigationList>
        </Navigation>
      </div>
      <div className="mt-2 w-full px-2">
        <Filter>
          <FilterValue className="w-full" onDeleteBadge={handleFilters}>
            <FilterTrigger />
          </FilterValue>
          <FilterWrapper>
            <FilterContent>
              <FilterHeader>
                <ListFilterIcon size={20} />
                <FilterTitle>FILTRO</FilterTitle>
                <FilterClose>
                  <X size={20} color="#f00" />
                </FilterClose>
              </FilterHeader>
              <FilterForm>
                <FilterItem>
                  <FilterLabel htmlFor="name">Nome</FilterLabel>
                  <FilterInput type={'text'} name={'name'} label={'Nome'} />
                </FilterItem>
                <FilterItem>
                  <FilterLabel htmlFor="cpf">CPF</FilterLabel>
                  <FilterInput type={'text'} name={'cpf'} label={'CPF'} mask={'###.###.###-##'} />
                </FilterItem>
                <FilterItem>
                  <FilterLabel htmlFor="login">Login</FilterLabel>
                  <FilterInput type={'text'} name={'login'} label={'Login'} />
                </FilterItem>
                <FilterItem>
                  <FilterLabel htmlFor="department">
                    Departamentos {departmentError && <span className='bg-red-500'>(Falha na busca dos dados)</span>}
                  </FilterLabel>
                  <FilterSelect
                    name={'department'}
                    placeholder={'Selecionar'}
                    label={'Departamento'}
                    option={returnDepartments()}
                  />
                </FilterItem>
                <FilterItem>
                  <FilterLabel htmlFor="department">
                    Grupos {groupsError && <span className='bg-red-500'>(Falha na busca dos dados)</span>}
                  </FilterLabel>
                  <FilterSelect
                    name={'group'}
                    placeholder={'Selecionar'}
                    label={'Grupo'}
                    option={returnGroups()}
                  />
                </FilterItem>
              </FilterForm>
              <FilterFooter>
                <FilterSubmit onSubmit={handleFilters}>
                  FILTRAR
                </FilterSubmit>
                <FilterClear>
                  LIMPAR TODOS
                </FilterClear>
              </FilterFooter>
            </FilterContent>
          </FilterWrapper>
        </Filter>
      </div>
      <div className="mt-1 w-full p-2">
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
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.login}</TableCell>
                    <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                    <TableCell className="hidden lg:table-cell">{user.departments?.name ?? '--'}</TableCell>
                    <TableCell className={user.active ? STATUS.active.color : STATUS.inactive.color}>
                      {user.active ? STATUS.active.label : STATUS.inactive.label}
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
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
            <PaginationPrevious handlePagination={handlePagination} />
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
            <PaginationNext handlePagination={handlePagination} />
          </div>
        </Pagination>
      </div>
    </section>
  )
}
