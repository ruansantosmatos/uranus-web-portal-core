export interface Group {
  id: string
  name: string
  alias: string
  users: string[]
  active: boolean
  role_id: string[]
  client_id: string
  description: string
}
