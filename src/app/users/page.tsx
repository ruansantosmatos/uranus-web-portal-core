'use client'

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
  return (
    <section className="h-[calc(100vh-4rem)] w-full bg-amber-400">
      <div className="flex h-10 w-full items-center bg-green-200 px-4">
        <Navigation>
          <NavigationList>
            <NavigationItem>
              <NavigationLink className="cursor-default">Contas</NavigationLink>
            </NavigationItem>
            <NavigationSeparator>/</NavigationSeparator>
            <NavigationItem>
              <NavigationLink className="cursor-default">Usuários</NavigationLink>
            </NavigationItem>
          </NavigationList>
        </Navigation>
      </div>
      <div className="h-[calc(100%-2.5rem)] w-full bg-red-300 p-2">
        <Card className="h-full">
          <CardContent>
            <p>AAA</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
