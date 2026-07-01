'use server'

import { getSession } from '@/lib/session'
import { handleError } from '@/lib/utils'
import type { FormState } from '@/types/form-types'
import { revalidatePath } from 'next/cache'
import { env } from '~/env.config'

export async function responseForumAction(
  _prevState: FormState | undefined,
  data: FormData,
): Promise<FormState | undefined> {
  const user = await getSession()

  const fields = Object.fromEntries(
    [...data].map(([key, value]) => [key, value.toString()]),
  )

  try {
    const response = await fetch(`${env.SERVER_API_URL}/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: fields.comment,
        user_id: user?.id,
        post_id: Number(fields.post_id),
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
  revalidatePath(`/forum/post/${fields.post_id}`)
}
