import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(
  date: string,
  options: Intl.DateTimeFormatOptions = {},
) {
  return new Intl.DateTimeFormat('fr', options).format(
    new Date(date),
  )
}

type FormState = {
  message: string
  fields?: Record<string, string>
  issues?: string[]
}

export function handleError(err: unknown, fields: Record<string, string> = {}): FormState {
  if (err instanceof TypeError) {
    return {
      message: 'Impossible de contacter le serveur. Vérifiez votre connexion.',
      fields,
      issues: [err.message],
    }
  }
  return {
    message: 'Une erreur inattendue est survenue.',
    fields,
    issues: [err instanceof Error ? err.message : 'Unknown error'],
  }
}
