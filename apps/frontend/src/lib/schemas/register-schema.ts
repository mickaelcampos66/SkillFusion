import { z } from 'zod'

const registerSchema = z.object({
  firstname: z.string().trim().min(1, { message: 'Prénom requis' }),
  lastname: z.string().trim().min(1, { message: 'Nom requis' }),
  email: z.string().trim().email({ message: 'Email invalide' }),
  password: z.string().trim().min(6, { message: 'Mot de passe trop court' })
    .max(20, { message: 'Mot de passe trop long' })
    .regex(/[A-Z]/, { message: 'Le mot de passe doit contenir au moins une majuscule' })
    .regex(/[a-z]/, { message: 'Le mot de passe doit contenir au moins une minuscule' })
    .regex(/[0-9]/, { message: 'Le mot de passe doit contenir au moins un chiffre' }),
  confirm_password: z.string().trim().min(6, { message: 'Confirmation requise' })
    .max(20, { message: 'Mot de passe trop long' })
    .regex(/[A-Z]/, { message: 'Le mot de passe doit contenir au moins une majuscule' })
    .regex(/[a-z]/, { message: 'Le mot de passe doit contenir au moins une minuscule' })
    .regex(/[0-9]/, { message: 'Le mot de passe doit contenir au moins un chiffre' }),
  phone_number: z
    .string()
    .trim()
    .refine(value => !value || /^(\+33|0)[1-9](\d{2}){4}$/.test(value), {
      message: 'Numéro de téléphone invalide',
    }),
  address: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.confirm_password !== data.password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['confirm_password'],
      message: 'Les mots de passe ne correspondent pas',
    })
  }
})

type RegisterSchema = z.output<typeof registerSchema>

export { registerSchema, type RegisterSchema }
