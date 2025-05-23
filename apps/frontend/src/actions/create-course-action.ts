'use server'

import { env } from '~/env.config'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import type { Course } from '@/types/course'
import { createCourseSchema } from '@/lib/schemas/create-course-schema'
import { handleError } from '@/lib/utils'
import type { FormState } from '@/types/form-types'

export async function createCourseAction(
  _prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const user = await getSession()

  const fields = Object.fromEntries(
    [...data].map(([key, value]) => [key, value.toString()]),
  )

  const parsed = createCourseSchema.safeParse(fields)
  if (!parsed.success) {
    return { message: 'Validation failed', issues: parsed.error.errors.map(e => e.message) }
  }

  let result: Course | null = null

  try {
    const response = await fetch(env.SERVER_API_URL + '/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.accessToken}`,
      },
      // ? NOTE: in the future we shouldn't send the created_by field, we have to retrieve it from 'Authorization' header
      body: JSON.stringify({ ...parsed.data, created_by: user?.id }),
    })

    if (!response.ok) {
      console.log('Error response:', response)

      const err = await response.json()
      return handleError(err, fields)
    }

    result = await response.json()
  }
  catch (err) {
    console.log('Error creating course:', err)

    return handleError(err, fields)
  }

  redirect(`/dashboard/my-courses/${result?.id}`)
}
