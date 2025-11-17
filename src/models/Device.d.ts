import { User } from './User'
import { Client } from './Client'
import { Brand, Model, Situation, Type } from '@/types'

export interface Device {
  id?: string
  name?: string
  type?: Type
  users?: User[]
  client?: Client
  active?: boolean
  brand?: Brand
  model?: Model
  created_at?: string
  updated_at?: string
  description?: string
  situation?: Situation
  serial_number?: string
}
