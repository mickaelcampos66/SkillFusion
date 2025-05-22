'use server'

import { env } from '~/env.config'
import { createSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import type { FormState, ErrorType } from '@/types/form-types'
import { handleError } from '@/lib/utils'

type LoginResult = {
  message: string
  accessToken: string
  id: number
  firstname: string
  lastname: string
}

export async function loginAction(
  _prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data)

  const fields: Record<string, string> = {}
  for (const key of Object.keys(formData)) {
    fields[key] = formData[key].toString()
  }

  try {
    const response = await fetch(env.SERVER_API_URL + '/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: fields.email,
        password: fields.password,
      }),
    })

    if (!response.ok) {
      const err: ErrorType = await response.json()

      return handleError(err, fields)
    }

    const result: LoginResult = await response.json()
    await createSession(result)
  }
  catch (error) {
    return handleError(error, fields)
  }
  redirect('/')
}
