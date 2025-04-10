import 'server-only'

import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

import { env } from '~/env.config'
import { RegisterUserResult } from '@/actions/register-action'

const JWT_SECRET = new TextEncoder().encode(env.JWT_SECRET)
const EXPIRES_IN = Number.parseInt(env.EXPIRES_IN.split('d')[0])

type JWTPayload = {
  id: number
  firstname: string
  lastname: string
  email: string
}

export async function createSession(session: RegisterUserResult) {
  const cookieStore = await cookies()

  cookieStore.set('session', JSON.stringify(session), {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 60 * 60 * 24 * EXPIRES_IN * 1000),
    sameSite: 'lax',
    path: '/',
  })
}

export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')

  if (!session) {
    return null
  }

  const parsedSession: RegisterUserResult = JSON.parse(session.value)

  try {
    const { payload } = await jwtVerify(parsedSession.accessToken, JWT_SECRET)

    return payload as JWTPayload
  }
  catch (error) {
    console.error('Error verifying JWT:', error)
    return null
  }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}
