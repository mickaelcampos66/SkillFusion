'use server'

import { env } from '~/env.config'
import { getSession } from '@/lib/session'
import type { FormState, ErrorType } from '@/types/form-types'
import { postSchema } from '@/lib/schemas/post-schema'
import { revalidatePath } from 'next/cache'
import { handleError } from '@/lib/utils'

export async function createPostAction(
  _prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const user = await getSession()

  if (!user) {
    return {
      message: 'Vous devez être connecté pour créer une discussion',
    }
  }

  const formData = Object.fromEntries(data)

  const fields: Record<string, string> = {}
  for (const key of Object.keys(formData)) {
    fields[key] = formData[key].toString()
  }
  const parsedFields = postSchema.safeParse(fields).data

  try {
    const response = await fetch(env.SERVER_API_URL + '/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.accessToken}`,
      },
      body: JSON.stringify({
        title: parsedFields?.title,
        content: parsedFields?.content,
      }),
    })

    if (!response.ok) {
      const err: ErrorType = await response.json()

      return handleError(err, fields)
    }
  }
  catch (error) {
    return handleError(error, fields)
  }
  revalidatePath('/forum')
  return {
    message: 'La question a été créé avec succès',
  }
}
