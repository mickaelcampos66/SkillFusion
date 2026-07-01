import { z } from 'zod'

const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: 'Titre trop court' })
    .max(100, { message: 'Titre trop long' }),
  content: z
    .string()
    .trim()
    .min(10, { message: 'Contenu trop court' })
    .max(10000, { message: 'Contenu trop long' }),
})

type PostSchema = z.output<typeof postSchema>

export { postSchema, type PostSchema }
