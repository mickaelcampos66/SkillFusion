'use server'

import { createSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { env } from '~/env.config'
import type { FormState } from '@/types/form-types'
import { handleError } from '@/lib/utils'

export type RegisterUserResult = {
  message: string
  id: number
  firstname: string
  lastname: string
  accessToken: string
}

export async function registerAction(
  _prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data)

  const fields: Record<string, string> = {}
  for (const key of Object.keys(formData)) {
    fields[key] = formData[key].toString()
  }

  try {
    const response = await fetch(env.SERVER_API_URL + '/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          firstname: fields.firstname,
          lastname: fields.lastname,
          email: fields.email,
          password: fields.password,
          phone_number: fields.phone_number,
          address: fields.address,
        },
      ),
    })

    if (!response.ok) {
      const err = await response.json()
      return handleError(err, fields)
    }

    const result: RegisterUserResult = await response.json()

    await createSession(result)
  }
  catch (error) {
    return handleError(error, fields)
  }
  redirect('/')
}
