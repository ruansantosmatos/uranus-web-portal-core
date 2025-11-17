'use client'
import { User } from '@/models'
import { Routes } from '@/constants'
import { getHeadersFetch } from '@/utils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ServicesUsers } from '@/services/users'
import {
  Card,
  Navigation,
  CardContent,
  NavigationItem,
  NavigationLink,
  NavigationList,
  NavigationSeparator
} from '@projectengine-team/hefesto'

export default function Users() {

  const route = useRouter()

  const [users, setUsers] = useState<User[]>([])

  const headers = getHeadersFetch()

  const configRequest: RequestInit = { method: 'GET', headers: headers }

  useEffect(() => { useFetchUsers() }, [])

  function handleRoute(path: string) {
    route.push(path)
  }

  async function useFetchUsers() {
    try {
      const response = await ServicesUsers.GetAllUsers({ request: configRequest })
      const users = response.data
      setUsers(users)
    } catch (error) {
      alert('Falha na busca dos usuários')
    }
  }

  return (
    <section className="h-[calc(100vh-4rem)] w-full bg-amber-400">
      <div className="flex h-10 w-full items-center bg-green-200 px-4">
        <Navigation>
          <NavigationList>
            <NavigationItem>
              <NavigationLink onClick={() => handleRoute(Routes.root.path)}>
                Home
              </NavigationLink>
            </NavigationItem>
            <NavigationSeparator />
            <NavigationItem>
              <NavigationLink className='cursor-auto'>
                Contas
              </NavigationLink>
            </NavigationItem>
            <NavigationSeparator />
            <NavigationItem>
              <NavigationLink onClick={() => handleRoute(Routes.users.path)}>
                Usuários
              </NavigationLink>
            </NavigationItem>
          </NavigationList>
        </Navigation>
      </div>
      <div className="h-[calc(100%-2.5rem)] w-full bg-red-300 p-2">
        <Card className="h-full">
          <CardContent>
            {
              users.map(user => { 
                return (

                )
              })
            }
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
