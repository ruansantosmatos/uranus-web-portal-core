import { Model } from './Model'
import { Status } from './Status'

export type Brand = {
  id?: string
  name?: string
  models?: Model
  status?: Status
  description?: string
  created_at?: string
  updated_at?: string
}
