import { User } from '@/models'
import { ZodString } from 'zod'

export type UserByLogin = Omit<User, 'guid_IS' | 'password'>

export type UserForm = {
  cpf: string
  rg?: string
  name: string
  login: string
  password?: string
  email?: string
  active: boolean
  phone_number?: string
  department_id?: string
  group_id: string[]
  registration_number: string
}

export type UpdateUserPassword = {
  password: string
  temporary: boolean
}

export type UpdatePasswordData = {
  password: string
  newPassword: string
}
