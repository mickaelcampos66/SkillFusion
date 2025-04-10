'use server'

import { env } from '~/env.config'

type RegisterFormState = {
  message: string
  fields?: Record<string, string>
  issues?: string[]
}

type RegisterResult = {
  message: string
  id: number
  firstname: string
  lastname: string
  accessToken: string
}

type ErrorType = {
  message: string | string[]
  error: string
  statusCode: number
}

export async function registerAction(
  _prevState: RegisterFormState,
  data: FormData,
): Promise<RegisterFormState> {
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
      const errorData: ErrorType = await response.json()

      return {
        message: errorData.error,
        fields,
        issues: Array.isArray(errorData.message) ? errorData.message : [errorData.message],
      }
    }

    const result: RegisterResult = await response.json()

    return {
      message: result.message,
    }
  }
  catch (error) {
    return {
      message: 'An error occurred while registering',
      fields,
      issues: [error instanceof Error ? error.message : 'Unknown error, please try again, or contact support'],
    }
  }
}
