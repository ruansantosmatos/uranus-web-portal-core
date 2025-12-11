'use client'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Department, Group } from '@/models'
import { schemaUserForm } from '@/validators'
import { ServicesUser } from '@/services/user'
import { ServicesGroup } from '@/services/group'
import { zodResolver } from '@hookform/resolvers/zod'
import { ServicesDepartment } from '@/services/department'
import { useRouter, useSearchParams } from 'next/navigation'
import { ConfigFetch, TypeForm, UserByLogin, UserForm } from '@/types'
import { formatCPF, formatPhone, getHeadersFetch, getPaginationParams, removeUndefined } from '@/utils'
import {
  NavigationList,
  NavigationItem,
  NavigationLink,
  Navigation,
  Card,
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectWrapper,
  Label,
  NavigationSeparator
} from '@projectengine-team/hefesto'

export default function FormUser() {
  const route = useRouter()
  const [groups, setGroups] = useState<Group[]>([])
  const [submit, setSubmit] = useState<boolean>(false)
  const [user, setUser] = useState<Partial<UserByLogin>>({})
  const [departments, setDepartments] = useState<Department[]>([])

  const headers = getHeadersFetch()

  const searchParams = useSearchParams()

  const login = searchParams.get('login')

  const { page, limit } = getPaginationParams()

  const messageCreate = 'Usuário registrado com sucesso!'

  const messageUpdate = 'Atualização realizada com sucesso!'

  const pathUserDetail = `/user/${login}?page=${page}&limit=${limit}`

  const configRequest: RequestInit = { method: 'GET', headers: headers }

  const typeForm: TypeForm = (searchParams.get('type_form') as TypeForm) ?? 'create'

  const {
    register,
    setValue,
    getValues,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({
    shouldFocusError: false,
    resolver: zodResolver(schemaUserForm)
  })

  useEffect(() => {
    loadDefaultFetch()
  }, [])

  function handleRoute(path: string) {
    route.push(path)
  }

  function loadDefaultFetch() {
    useFetchGroups()
    useFetchDepartments()
    typeForm === 'update' && login && useFetchUserByLogin()
  }

  function getDepartmentId(name: string) {
    const departmentId = departments.filter((department) => {
      if (department.name === name) {
        return department
      }
    })

    return departmentId[0]?.id
  }

  function getGroupsId(names: string[]) {
    const groups_id: string[] = []

    names.forEach((name) => {
      const dataGroup = groups.filter((group) => group.name === name)
      dataGroup.length > 0 && groups_id.push(dataGroup[0].id)
    })

    return groups_id
  }

  async function createUser({ config }: { config: ConfigFetch }) {
    try {
      await ServicesUser.Create({ config })
      setSubmit(false)
      Swal.fire({ icon: 'success', text: messageCreate, didClose: () => handleRoute('/user') })
    } catch (error) {
      Swal.fire({ icon: 'error', text: 'Falha no processo de registro.' })
    }
  }

  async function updateUser({ request }: { request: { login: string; config: ConfigFetch } }) {
    try {
      await ServicesUser.Update(request)
      setSubmit(false)
      Swal.fire({ icon: 'success', text: messageUpdate, didClose: () => handleRoute(pathUserDetail) })
    } catch (error) {
      Swal.fire({ icon: 'error', text: 'Falha no processo de atualização.' })
    }
  }

  async function useFetchDepartments() {
    try {
      const config: ConfigFetch = { request: configRequest }
      const response = await ServicesDepartment.GetAll(config)

      const data = response.data
      setDepartments(data)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Não foi possível carregar departamentos'
      })
    }
  }

  async function useFetchGroups() {
    try {
      const config: ConfigFetch = { request: configRequest }
      const response = await ServicesGroup.GetAll(config)

      const data = response.data
      setGroups(data)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Não foi possível carregar grupos. Tente novamente.'
      })
    }
  }

  async function useFetchUserByLogin() {
    try {
      const config: ConfigFetch = { request: configRequest }
      const response = await ServicesUser.GetByLogin({ login: login as string, config: config })
      const user = response.data
      setUser(user)

      setValue('rg', user.rg ?? '')
      setValue('login', user.login ?? '')

      setValue('name', user.name ?? '')
      setValue('phone_number', formatPhone(user.phone_number ?? ''))

      setValue('email', user.email ?? '')
      setValue('cpf', formatCPF(user.cpf ?? ''))

      setValue('active', user?.active ? 'ATIVO' : 'INATIVO')
      setValue('department_id', user.departments?.name ?? '')

      setValue('registration_number', user.registration_number ?? '')
      setValue('group_id', user.groups?.map((item) => item.name) as string[])
    } catch (error) {
      Swal.fire({ icon: 'error', text: 'falha na busca das informações do usuário' })
    }
  }

  function onSubmit(data: UserForm) {
    const methodSubmit = typeForm === 'update' ? 'PUT' : 'POST'
    const replaceCPF = data.cpf.replace(/\D/g, '')
    const replacePhone = data.phone_number?.replace(/\D/g, '')

    const payloadRaw = {
      ...data,
      cpf: replaceCPF,
      group_id: getGroupsId(data.group_id),
      phone_number: data.phone_number ? replacePhone : undefined,
      department_id: data.department_id ? getDepartmentId(data.department_id) : undefined
    }

    const payload = removeUndefined(payloadRaw)
    useSubmitFormUser({ payload: payload, method: methodSubmit })
  }

  function useSubmitFormUser({ payload, method }: { payload: UserForm; method: 'POST' | 'PUT' }) {
    setSubmit(true)
    const configRequest: RequestInit = { headers, method, body: JSON.stringify(payload) }

    const config: ConfigFetch = { request: configRequest }
    const request = { login: login as string, config: config }

    switch (method) {
      case 'POST':
        createUser({ config })
        break

      case 'PUT':
        updateUser({ request })
        break
    }
  }

  return (
    <section className="flex min-h-screen w-full flex-col">
      <div className="justif flex w-full items-end px-5 py-2">
        <Navigation className="">
          <NavigationList>
            <NavigationItem>
              <NavigationLink onClick={() => handleRoute('/user')}>Usuários</NavigationLink>
            </NavigationItem>
            <NavigationSeparator />
            <NavigationItem>
              <NavigationLink
                onClick={() => {
                  typeForm === 'update' && handleRoute(pathUserDetail)
                }}
              >
                {typeForm === 'update' ? (user?.name ?? 'Carregando..') : 'Novo Usuário'}
              </NavigationLink>
            </NavigationItem>
          </NavigationList>
        </Navigation>
      </div>
      <div className="flex w-full flex-1 flex-col items-center p-5">
        <Card className="w-full max-w-3xl p-0">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 rounded-sm p-5 shadow">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Dados do Usuário</h2>
              <div className="flex w-full flex-col gap-1 p-1">
                <Label require>Nome</Label>
                <Input {...register('name')} onFocus={() => clearErrors('name')} />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div className="flex w-full flex-col gap-1 p-1">
                <Label require>CPF</Label>
                <Input
                  {...register('cpf')}
                  onFocus={() => clearErrors('cpf')}
                  onChange={(e) => setValue('cpf', formatCPF(e.target.value), { shouldValidate: true })}
                />
                {errors.cpf && <p className="text-sm text-red-500">{errors.cpf.message}</p>}
              </div>
              <div className="flex w-full flex-col gap-1 p-1">
                <Label require>N de Matricula</Label>
                <Input
                  {...register('registration_number')}
                  placeholder="Número de Matrícula"
                  onFocus={() => clearErrors('registration_number')}
                />
                {errors.registration_number && (
                  <p className="text-sm text-red-500">{errors.registration_number.message}</p>
                )}
              </div>
              <div className="flex w-full flex-col gap-1 p-1">
                <Label require>Email</Label>
                <Input {...register('email')} onFocus={() => clearErrors('email')} />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div className="flex w-full flex-col gap-1 p-1">
                <Label>RG</Label>
                <Input {...register('rg')} />
              </div>
              <div className="flex w-full flex-col gap-1 p-1">
                <Label>Telefone</Label>
                <Input
                  {...register('phone_number')}
                  onChange={(e) => setValue('phone_number', formatPhone(e.target.value), { shouldValidate: true })}
                />
              </div>
              <div className="flex w-full flex-col gap-1 p-1">
                <Label require>Grupo</Label>
                <Select
                  multiple
                  value={getValues('group_id')}
                  onClick={() => clearErrors('group_id')}
                  onChange={(value) => {
                    setValue('group_id', value as string[])
                  }}
                >
                  <SelectWrapper>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar grupo" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map((item) => {
                        return (
                          <SelectItem label={item.name} value={item.name} key={item.id}>
                            {item.name}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </SelectWrapper>
                </Select>
                {errors.group_id && <p className="text-sm text-red-500">Erro pai</p>}
              </div>
              <div className="flex w-full flex-col gap-1 p-1">
                <Label>Departamento</Label>
                <Select
                  value={getValues('department_id')}
                  onChange={(value) => setValue('department_id', value as string)}
                >
                  <SelectWrapper>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((item) => {
                        return (
                          <SelectItem key={item.id} label={item.name} value={item.name}>
                            {item.name}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </SelectWrapper>
                </Select>
              </div>
              <div className="flex w-full flex-col gap-1 p-1">
                <Label require>Status</Label>
                <Select
                  value={getValues('active')}
                  onClick={() => clearErrors('active')}
                  onChange={(value) => {
                    setValue('active', value as string)
                  }}
                >
                  <SelectWrapper>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem label="ATIVO" value="ATIVO">
                        ATIVO
                      </SelectItem>
                      <SelectItem label="INATIVO" value="INATIVO">
                        INATIVO
                      </SelectItem>
                    </SelectContent>
                  </SelectWrapper>
                </Select>
                {errors.active && <p className="text-sm text-red-500">{errors.active.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Dados do Login</h2>
              <div className="flex w-full flex-col gap-1 p-1">
                <Label require>Login</Label>
                <Input {...register('login')} onFocus={() => clearErrors('login')} />
                {errors.login && <p className="text-sm text-red-500">{errors.login.message}</p>}
              </div>
              {typeForm === 'create' && (
                <div className="flex w-full flex-col gap-1 p-1">
                  <Label require>Senha</Label>
                  <Input type={'password'} {...register('password')} onFocus={() => clearErrors('password')} />
                  {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </div>
              )}
            </div>
            <div className="flex w-full items-center justify-end gap-2">
              <Button
                type="button"
                disabled={submit}
                variant={'outline'}
                onClick={() => (typeForm === 'update' ? handleRoute(pathUserDetail) : handleRoute('/user'))}
              >
                CANCELAR
              </Button>
              <Button variant={'default'} type="submit" disabled={submit}>
                {submit ? 'CARREGANDO..' : 'SALVAR'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  )
}
