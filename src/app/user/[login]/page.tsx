'use client'
import * as z from "zod"
import { KeySquare } from 'lucide-react'
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { ServicesUser } from '@/services/user'
import { ConfigFetch, StatusFetch, UpdateUserPassword } from '@/types'
import { formatDate, getHeadersFetch } from '@/utils'
import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { UpdatePasswordData, UpdatePasswordSchema, UserByLogin } from "@/types"
import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogWrapper,
  Document,
  DocumentBody,
  DocumentDivider,
  DocumentFooter,
  DocumentHeader,
  DocumentItem,
  DocumentItemSubtitle,
  DocumentItemTitle,
  DocumentSection,
  DocumentSectionContent,
  DocumentSectionHeader,
  DocumentSectionTitle,
  DocumentStatus,
  DocumentTitle,
  Input,
  Label,
  Navigation,
  NavigationItem,
  NavigationLink,
  NavigationList,
  NavigationSeparator,
  Skeleton
} from '@projectengine-team/hefesto'

export default function UserDetailProfile() {
  const route = useRouter()
  const [user, setUser] = useState<Partial<UserByLogin>>({})
  const [modalPassword, setModalPassword] = useState<boolean>(false)
  const [statusFetch, setStatusFetch] = useState<StatusFetch>('none')
  const [statusUpdate, setStatusUpdate] = useState<StatusFetch>('none')

  const params = useParams<{ login: string }>()

  const headers = getHeadersFetch()

  const userGroups = user.groups?.map((value) => value.name).join(' / ') ?? '--'

  const schemaCore: UpdatePasswordSchema = {
    password: z.string().min(6, 'Deve possuir no mínimo 6 carcteres'),
    newPassword: z.string().min(6, 'Deve possuir no mínimo 6 carcteres'),
  }

  const schemaValidation = z.object<UpdatePasswordSchema>(schemaCore).required()

  const {
    reset,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schemaValidation),
    shouldFocusError: false
  })

  useEffect(() => { useFetchUserByLogin() }, [])

  function handleRoute(path: string) {
    route.push(path)
  }

  function openModalPassword() {
    setModalPassword(true)
  }

  function closeModalPassword() {
    reset()
    setModalPassword(false)
  }

  async function useFetchUserByLogin() {
    try {
      setStatusFetch('loading')
      const login = params.login

      const configRequest: RequestInit = { method: 'GET', headers: headers }
      const config: ConfigFetch = { request: configRequest }

      const response = await ServicesUser.GetByLogin({ login: login, config: config })
      const user = response.data

      setUser(user)
      setTimeout(() => { setStatusFetch('success') }, 200)
    } catch (error) {
      alert('Ops! Houve uma falha na busca dos dados')
      setStatusFetch('error')
    }
  }

  async function useUpdatePassword(data: UpdatePasswordData) {
    try {
      setStatusUpdate('loading')
      const login = params.login
      const { password, newPassword } = data

      if (password === newPassword) {
        const body: UpdateUserPassword = { temporary: true, password: newPassword }
        
        const configRequest: RequestInit = { 
          method: 'PUT', 
          headers: headers, 
          body: JSON.stringify(body) 
        }

        const config: ConfigFetch = { request: configRequest }
        await ServicesUser.UpdatePassword({ login: login, config: config })

        setTimeout(() => setStatusUpdate('success'), 500)
        closeModalPassword()
      }
      else {
        setStatusUpdate('none')
        setError('password', { message: 'As senhas devem ser iguais!' })
      }
    }
    catch (error) {
      setStatusUpdate('none')
      setModalPassword(false)
      alert('Ops! Houve uma falha na atualização da senha, tente novamente!')
    }
  }

  function CustomDocumentItem({ value }: { value: string }) {
    return <>{statusFetch === 'success' ? <DocumentItemSubtitle>{value}</DocumentItemSubtitle> : <Skeleton />}</>
  }

  return (
    <section className="h-screen w-full">
      <div className='w-full py-2 px-5 flex justify-between items-center'>
        <Navigation>
          <NavigationList>
            <NavigationItem>
              <NavigationLink onClick={() => handleRoute('/user')}>Usuários</NavigationLink>
            </NavigationItem>
            <NavigationSeparator />
            <NavigationItem>
              <NavigationLink>{user.login ?? 'Carregando..'}</NavigationLink>
            </NavigationItem>
          </NavigationList>
        </Navigation>
        <Button className='sm:hidden' onClick={openModalPassword}>
          <KeySquare size={20} />
          <span className="sr-only sm:not-sr-only">ALTERAR SENHA</span>
        </Button>
      </div>
      <div className="h-[95%] w-full flex justify-center">
        <Dialog open={modalPassword}>
          <DialogWrapper closable={false}>
            <DialogContent className='w-[90%] md:w-[60%] xl:w-[30%]'>
              <DialogHeader className='px-6'>
                <DialogTitle>Alterar Senha</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <form
                  method="post"
                  id="form-update-password"
                  onSubmit={handleSubmit(useUpdatePassword)}
                  className='w-full h-full flex flex-col gap-1'
                >
                  <div className='w-full p-2 flex flex-col gap-0.5'>
                    <Label require htmlFor='password' className='ml-0.5'>Senha</Label>
                    <Input type='password' onFocus={() => clearErrors('password')} {...register('password')} />
                    <p className="text-red-400 text-sm">{errors.password?.message}</p>
                  </div>
                  <div className='w-full p-2 flex flex-col gap-0.5'>
                    <Label require htmlFor='new-password' className='ml-0.5'>Nova Senha</Label>
                    <Input type='password' onFocus={() => clearErrors('newPassword')} {...register('newPassword')} />
                    <p className="text-red-400 text-sm">{errors.newPassword?.message}</p>
                  </div>
                </form>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={closeModalPassword}
                  disabled={statusUpdate === 'loading'}
                >
                  CANCELAR
                </Button>
                <Button
                  type={'submit'}
                  variant="default"
                  form={'form-update-password'}
                  disabled={statusUpdate === 'loading'}
                >
                  {statusUpdate === 'loading' ? 'ATUALIZANDO..' : 'ATUALIZAR'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </DialogWrapper>
        </Dialog>
        <Document className="mt-2 h-[70%] w-[90%] md:h-[65%] md:w-[95%] xl:w-[75%]">
          <DocumentHeader>
            <DocumentTitle>
              {statusFetch === 'success' ? user.name : 'Carregando..'}
            </DocumentTitle>
            <DocumentStatus variant={user.active ? 'success' : 'error'}>
              {user.active ? 'ATIVO' : 'INATIVO'}
            </DocumentStatus>
          </DocumentHeader>
          <DocumentDivider />
          <DocumentBody className=''>
            <DocumentSection>
              <DocumentSectionHeader>
                <DocumentSectionTitle className="text-lg">Dados Pessoais</DocumentSectionTitle>
              </DocumentSectionHeader>
              <DocumentSectionContent className='md:grid-cols-2 lg:grid-cols-3'>
                <DocumentItem>
                  <DocumentItemTitle>Nome Completo</DocumentItemTitle>
                  <CustomDocumentItem value={user.name ?? '--'} />
                </DocumentItem>
                <DocumentItem>
                  <DocumentItemTitle>Data/Hora (Cadastro)</DocumentItemTitle>
                  <CustomDocumentItem value={formatDate(user.created_at ?? '') ?? '--'} />
                </DocumentItem>
                <DocumentItem>
                  <DocumentItemTitle>Data/Hora (Atualização)</DocumentItemTitle>
                  <CustomDocumentItem value={formatDate(user.updated_at ?? '') ?? '--'} />
                </DocumentItem>
                <DocumentItem>
                  <DocumentItemTitle>Email</DocumentItemTitle>
                  <CustomDocumentItem value={user.email ?? '--'} />
                </DocumentItem>
                <DocumentItem>
                  <DocumentItemTitle>Telefone Celular</DocumentItemTitle>
                  <CustomDocumentItem value={user.phone_number ?? '--'} />
                </DocumentItem>
                <DocumentItem>
                  <DocumentItemTitle>Login</DocumentItemTitle>
                  <CustomDocumentItem value={user.login ?? '--'} />
                </DocumentItem>
                <DocumentItem>
                  <DocumentItemTitle>CPF</DocumentItemTitle>
                  <CustomDocumentItem value={user.cpf ?? '--'} />
                </DocumentItem>
                <DocumentItem>
                  <DocumentItemTitle>N° de Matrícula</DocumentItemTitle>
                  <CustomDocumentItem value={user.registration_number ?? '--'} />
                </DocumentItem>
              </DocumentSectionContent>
            </DocumentSection>
            <DocumentDivider />
            <DocumentSection>
              <DocumentSectionHeader>
                <DocumentSectionTitle className="text-lg">Atribuição</DocumentSectionTitle>
              </DocumentSectionHeader>
              <DocumentSectionContent className='md:grid-cols-2 lg:grid-cols-3'>
                <DocumentItem>
                  <DocumentItemTitle>Grupos</DocumentItemTitle>
                  <CustomDocumentItem value={userGroups} />
                </DocumentItem>
                <DocumentItem>
                  <DocumentItemTitle>Departamento</DocumentItemTitle>
                  <CustomDocumentItem value={user.departments?.name ?? '--'} />
                </DocumentItem>
              </DocumentSectionContent>
            </DocumentSection>
            <DocumentDivider />
            <DocumentSection>
              <DocumentSectionHeader>
                <DocumentSectionTitle className="text-lg">Aparelhos</DocumentSectionTitle>
              </DocumentSectionHeader>
              <DocumentSectionContent className='md:grid-cols-2 lg:grid-cols-3'>
                {statusFetch !== 'success' ? (
                  <Skeleton />
                ) : user.devices?.length === 0 ? (
                  <DocumentItem>
                    <DocumentItemTitle>{'--'}</DocumentItemTitle>
                  </DocumentItem>
                ) : (
                  user.devices?.map((device) => {
                    return (
                      <DocumentItem key={device.id}>
                        <DocumentItemTitle>{device.name ?? '--'}</DocumentItemTitle>
                        <DocumentItemSubtitle>{device.serial_number ?? '--'}</DocumentItemSubtitle>
                      </DocumentItem>
                    )
                  })
                )}
              </DocumentSectionContent>
            </DocumentSection>
          </DocumentBody>
          <DocumentFooter>
            <Button variant={'outline'} className='hidden sm:flex' onClick={openModalPassword}>ALTERAR SENHA</Button>
            <Button variant={'outline'} onClick={() => handleRoute('/user')}>VOLTAR</Button>
            <Button variant={'default'} onClick={() => handleRoute('/form')}>EDITAR</Button>
          </DocumentFooter>
        </Document>
      </div>
    </section>
  )
}
