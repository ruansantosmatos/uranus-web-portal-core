export type RouteConfig = {
  path: string
  name: string
  group: string
}

export type Route = 'root' | 'users'

export const Routes: Record<Route, RouteConfig> = {
  root: {
    path: '/',
    name: 'root',
    group: 'root'
  },
  users: {
    path: '/user',
    group: 'Contas',
    name: 'Usuários'
  }
}
