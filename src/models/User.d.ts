import { Role } from './Role'
import { Group } from './Group'
import { Client } from './Client'
import { Module } from './Module'
import { Device } from './Device'
import { Department } from './Department'

export interface User {
  id?: string
  name?: string
  surname?: string
  login?: string
  email?: string
  phone_number?: string | null
  cpf?: string
  rg?: string | null
  registration_number?: string
  guid_IS?: string
  created_at?: string
  updated_at?: string
  client?: Client
  modules?: Module
  devices?: Device[]
  groups?: Group[]
  departments?: Department
  active?: boolean
  password?: string
  tenant?: string
  consent?: boolean
  roles: Role[]
}
