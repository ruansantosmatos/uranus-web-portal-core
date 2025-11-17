export type StatesTypesStatus = 'active' | 'inactive'

export type StatusConfigProps = {
  label: string
  color: string
}

export const STATUS: Record<StatesTypesStatus, StatusConfigProps> = {
  active: { label: 'ATIVO', color: 'text-green-600' },
  inactive: { label: 'INATIVO', color: 'text-red-600' }
}
