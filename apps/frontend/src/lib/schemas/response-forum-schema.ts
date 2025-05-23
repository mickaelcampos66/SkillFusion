import { z } from 'zod'

const responseForumSchema = z.object({
  comment: z
    .string()
    .trim()
    .min(1, { message: 'Response is required' }),
})

type ResponseForumSchema = z.output<typeof responseForumSchema>

export { type ResponseForumSchema, responseForumSchema }
