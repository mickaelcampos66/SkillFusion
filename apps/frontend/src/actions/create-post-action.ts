'use server'

import { env } from '~/env.config'
import { getSession } from '@/lib/session'
import type { FormState } from '@/types/form-types'
import { postSchema } from '@/lib/schemas/post-schema'
import { revalidatePath } from 'next/cache'
import { handleError } from '@/lib/utils'

export async function createPostAction(
  _prevState: FormState | undefined,
  data: FormData,
): Promise<FormState | undefined> {
  const user = await getSession()

  if (!user) {
    return {
      message: 'Vous devez être connecté pour créer une discussion',
    }
  }

  const fields = Object.fromEntries(
    [...data].map(([key, value]) => [key, value.toString()]),
  )
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
        user_id: user.id,
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      return handleError(err, fields)
    }
  }
  catch (error) {
    return handleError(error, fields)
  }
  revalidatePath('/forum')
}
