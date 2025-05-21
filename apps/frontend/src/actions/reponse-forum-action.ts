'use server'

import type { FormState } from '@/types/form-types'

export async function responseForumAction(
  _prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data)

  const fields: Record<string, string> = {}
  for (const key of Object.keys(formData)) {
    fields[key] = formData[key].toString()
  }

  try {
    // TODO: replace with real API call
    // const response = await fetch(env.SERVER_API_URL + '/api/forum/post/message', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     message: fields.message,
    //   }),
    // })

    // if (!response.ok) {
    //   const errorData: ErrorType = await response.json()

    //   return {
    //     message: errorData.error,
    //     fields,
    //     issues: Array.isArray(errorData.message)
    //       ? errorData.message
    //       : [errorData.message],
    //   }
    // }
    // TODO: handle success
    return {
      message: 'Message posted successfully',
      fields,
      issues: [],
    }
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
}
