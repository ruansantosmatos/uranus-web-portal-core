'use client'
import { useRouter } from 'next/navigation'
import { TableUser } from '@/components/User'
import { ServicesUser } from '@/services/user'
import { ServicesGroup } from '@/services/group'
import { Department, Group, User } from '@/models'
import { ConfigFetch, StatusFetch } from '@/types'
import { ChangeEvent, useEffect, useState } from 'react'
import { ServicesDepartment } from '@/services/department'
import { getHeadersFetch, updateQueryParams } from '@/utils'
import { PaginationTable } from '@/components/PaginationTable'
import { ListFilterIcon, UserPlus2Icon, X } from 'lucide-react'
import {
  Filter,
  Navigation,
  NavigationItem,
  NavigationLink,
  NavigationList,
  NavigationSeparator,
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
  Button
} from '@projectengine-team/hefesto'

export default function Users() {
  const route = useRouter()
  const [page, setPage] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [limit, setLimit] = useState<number>(15)
  const [users, setUsers] = useState<User[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [groupsError, setGroupsError] = useState<boolean>(false)
  const [departments, setDepartments] = useState<Department[]>([])
  const [statusFetch, setStatusFetch] = useState<StatusFetch>('none')
  const [departmentError, setDepartmentError] = useState<boolean>(false)

  const headers = getHeadersFetch()

  const configRequest: RequestInit = { method: 'GET', headers: headers }

  const statusUser: { value: string; label: string }[] = [
    { value: 'ATIVO', label: 'ATIVO' },
    { value: 'INATIVO', label: 'INATIVO' }
  ]

  const transformers: Record<string, (value: string) => string | boolean | number> = {
    cpf: (value) => value.replace(/\D/g, ''),
    active: (value) => value.toUpperCase() === 'ATIVO'
  }

  useEffect(() => {
    loadDefaultUseFetch()
  }, [])

  useEffect(() => {
    useFetchUsers()
  }, [page, limit])

  function loadDefaultUseFetch() {
    useFetchGroups()
    useFetchDepartments()
  }

  function handleRoute(path: string) {
    route.push(path)
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
    setPage(defaultPage)
    updateQueryParams({ page: defaultPage, limit: value })
  }

  function handlePagination(page: string) {
    setPage(Number(page))
    updateQueryParams({ page: page })
  }

  function returnSearchParams() {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params: Record<string, any> = {}

    urlSearchParams.forEach((value, key) => {
      const transform = transformers[key]
      params[key] = transform ? transform(value) : value
    })

    return params
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
    } catch (error) {
      setGroupsError(true)
    }
  }

  async function useFetchUsers() {
    try {
      setStatusFetch('loading')
      const params: Record<string, string> = returnSearchParams()
      const paramsActive = Object.entries(params)

      setPage(parseInt(params.page ?? page))
      setLimit(parseInt(params.limit ?? limit))

      const config: ConfigFetch = {
        request: configRequest,
        searchParams: paramsActive.length > 0 ? params : { page, limit }
      }

      const response = await ServicesUser.GetAll(config)
      const users = response.data
      const totalMetada = response.metadata.total

      setUsers(users)
      setTotal(totalMetada)
      setTimeout(() => {
        setStatusFetch('success')
      }, 200)
    } catch (error) {
      setStatusFetch('error')
    }
  }

  return (
    <section className="h-screen w-full">
      <div className="flex h-14 w-full items-center justify-between px-5">
        <Navigation>
          <NavigationList>
            <NavigationItem>
              <NavigationLink onClick={() => handleRoute('/')}>Home</NavigationLink>
            </NavigationItem>
            <NavigationSeparator />
            <NavigationItem>
              <NavigationLink onClick={() => handleRoute('/user')}>Usuários</NavigationLink>
            </NavigationItem>
          </NavigationList>
        </Navigation>
        <div>
          <Button>
            <UserPlus2Icon size={20} />
            <span className="sr-only sm:not-sr-only">NOVO USUÁRIO</span>
          </Button>
        </div>
      </div>
      <div className="mt-2 w-full px-4">
        <Filter>
          <FilterValue className="w-full" onDeleteBadge={useFetchUsers}>
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
                    Departamentos {departmentError && <span className="bg-red-500">(Falha na busca dos dados)</span>}
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
                    Grupos {groupsError && <span className="bg-red-500">(Falha na busca dos dados)</span>}
                  </FilterLabel>
                  <FilterSelect name={'group'} placeholder={'Selecionar'} label={'Grupo'} option={returnGroups()} />
                </FilterItem>
                <FilterItem>
                  <FilterLabel htmlFor="active">Status</FilterLabel>
                  <FilterSelect name={'active'} label={'Status'} option={statusUser} placeholder={'Selecionar'} />
                </FilterItem>
              </FilterForm>
              <FilterFooter>
                <FilterSubmit onSubmit={useFetchUsers}>FILTRAR</FilterSubmit>
                <FilterClear onClear={useFetchUsers}>LIMPAR TODOS</FilterClear>
              </FilterFooter>
            </FilterContent>
          </FilterWrapper>
        </Filter>
      </div>
      <div className="w-full px-4 mt-3">
        <TableUser users={users} limit={limit} statusFetch={statusFetch} />
        <PaginationTable
          page={page}
          total={total}
          limit={limit}
          handleLimit={handleLimit}
          handlePagination={handlePagination}
        />
      </div>
    </section>
  )
}
