import { z } from 'zod'

const createCourseSchema = z.object({
  name: z.string().min(1, { message: 'Le nom est requis.' }),
  description: z.string().min(1, { message: 'La description est requise.' }),
  content: z.string().min(10, { message: 'Le contenu est requis.' }),
  image: z.string().min(1, { message: 'L\'image est requise.' }),
  level: z.string().min(1, { message: 'Le niveau est requis.' }),
  // category_ids: z
  //   .any()
  //   .default([])
  //   .transform((val) => {
  //     if (Array.isArray(val)) return val.map(Number)
  //     if (typeof val === 'string') {
  //       try {
  //         const arr = JSON.parse(val)
  //         if (Array.isArray(arr)) return arr.map(Number)
  //       }
  //       catch { /* empty */ }
  //     }
  //   })
  //   .refine(arr => Array.isArray(arr) && arr.length > 0 && arr.every(Number.isInteger), {
  //     message: 'Au moins une catégorie est requise.',
  //   }),
})

type CreateCourseSchema = z.output<typeof createCourseSchema>

export { createCourseSchema, type CreateCourseSchema }
