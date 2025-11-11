export type NaturalPersonClient = {
  cpf: string
}

export type ConfigurationClient = {
  name: string
  type: string
  value: string
}

export type LegalPersonClient = {
  cnpj: string
  company_name: string
  trading_name: string
}

export type PayFeaturesClient = {
  id: string
  alias: string
  roles: string[]
}

export type PayModulesClient = {
  id: string
  name: string
  alias: string
  alias: string
  description: string
  allocation_date: string
  pay_features: PayFeaturesClient[]
}

export interface Client {
  id: string
  name: string
  alias: string
  logo?: string
  tenant: string
  active: boolean
  address: string
  tenant_id: string
  type_person: number
  owner_name: string
  created_at: string
  updated_at: string
  owner_email: string
  owner_phone: string
  contract_end: string
  contract_start: string
  legal_person: LegalPersonClient
  pay_modules: PayModulesClient[]
  natural_person: NaturalPersonClient
  configuration: ConfigurationClient[]
}
