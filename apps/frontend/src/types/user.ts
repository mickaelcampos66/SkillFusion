import { z } from 'zod'

export interface UserResponse {
  data: User
  message: string
}

export const UserRole = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
} as const
export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export const userDataSchema = z.object({
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  phone_number: z.string().nullable(),
  address: z.string().nullable(),
  role_id: z.number(),
  role: z.enum([UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN]),
  created_at: z.string(),
  updated_at: z.string(),
})

export type User = z.infer<typeof userDataSchema>
