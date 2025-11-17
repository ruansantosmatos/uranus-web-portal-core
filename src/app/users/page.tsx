'use client'
import { Suspense } from 'react'
import { Routes } from '@/constants'
import { useRouter } from 'next/navigation'
import { TableUser } from '@/components/Users'
import {
  Card,
  Navigation,
  CardContent,
  NavigationItem,
  NavigationLink,
  NavigationList,
  NavigationSeparator,
  CardFooter
} from '@projectengine-team/hefesto'

export default function Users() {
  const route = useRouter()

  function handleRoute(path: string) {
    route.push(path)
  }

  return (
    <section className="h-[calc(100vh-4rem)] w-full">
      <div className="flex h-10 w-full items-end px-5">
        <Navigation>
          <NavigationList>
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
      <div className="h-[calc(100%-2.5rem)] w-full p-2">
        <Card>
          <CardContent>
            <TableUser />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
