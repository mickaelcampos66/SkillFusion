export type FormState = {
  message: string
  fields?: Record<string, string>
  issues?: string[]
}

export type ErrorType = {
  message: string | string[]
  error: string
  statusCode: number
}
