import { z } from 'zod'

export const schemaUpdatePassword = z
  .object({
    password: z.string().min(6, 'Deve possuir no mínimo 6 carcteres'),
    newPassword: z.string().min(6, 'Deve possuir no mínimo 6 carcteres')
  })
  .required()
