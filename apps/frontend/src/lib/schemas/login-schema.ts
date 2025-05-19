// src/lib/schemas/login-schema.ts
import { z } from 'zod'

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: 'Email invalide' }),

  password: z
    .string()
    .trim()
    .min(6, { message: 'Mot de passe trop court' })
    .max(20, { message: 'Mot de passe trop long' }),
})

type LoginSchema = z.output<typeof loginSchema>

export { loginSchema, type LoginSchema }
