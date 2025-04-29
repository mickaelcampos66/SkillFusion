'use server'

import { env } from '~/env.config'
import { createSession } from '@/lib/session'
import { redirect } from 'next/navigation'

type LoginFormState = {
  message: string
  fields?: Record<string, string>
  issues?: string[]
}

type LoginResult = {
  message: string
  accessToken: string
  id: number
  firstname: string
  lastname: string
}

type ErrorType = {
  message: string | string[]
  error: string
  statusCode: number
}

export async function loginAction(
  _prevState: LoginFormState,
  data: FormData,
): Promise<LoginFormState> {
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
      const errorData: ErrorType = await response.json()

      return {
        message: errorData.error,
        fields,
        issues: Array.isArray(errorData.message)
          ? errorData.message
          : [errorData.message],
      }
    }

    const result: LoginResult = await response.json()
    await createSession(result)
  }
  catch (error) {
    return {
      message: 'An error occurred while logging in',
      fields,
      issues: [
        error instanceof Error ? error.message : 'Unknown error, please try again, or contact support',
      ],
    }
  }
  redirect('/')
}
