import { Brand } from './Brand'
import { Status } from './Status'

export type Model = {
  id?: string
  name?: string
  brand?: Brand
  status?: Status
  created_at?: string
  updated_at?: string
  description?: string
}
