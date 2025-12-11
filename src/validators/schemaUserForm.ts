import { z } from 'zod'

export const schemaUserForm = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  login: z.string().min(1, 'O login é obrigatório'),
  password: z.string().min(4, 'A senha é obrigatório').optional(),
  group_id: z.string().min(1, 'O grupo é obrigatório').array(),
  registration_number: z.string().min(2, 'O número de matrícula é obrigatório'),
  email: z.string().min(5, 'O email é obrigatório'),
  rg: z
    .string()
    .optional()
    .transform((v) => (v === '' ? undefined : v)),
  phone_number: z
    .string()
    .optional()
    .transform((v) => (v === '' ? undefined : v)),
  department_id: z
    .string()
    .optional()
    .transform((v) => (v === '' ? undefined : v)),
  cpf: z
    .string()
    .min(1, 'O CPF é obrigatório')
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato de CPF inválido'),
  active: z
    .string()
    .min(1, 'O status é obrigatório')
    .transform((v) => (v === 'ATIVO' ? true : false))
})
