import 'server-only'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { env } from '~/env.config'
import { RegisterUserResult } from '@/actions/register-action'
import { userDataSchema, UserResponse } from '@/types/user'

const JWT_SECRET = new TextEncoder().encode(env.JWT_SECRET)
const match = /^(\d+)d$/.exec(env.EXPIRES_IN)
if (!match) throw new Error('ENV.EXPIRES_IN should be in the format "<number>d"')
const EXPIRES_IN = Number(match[1])

type UserData = UserResponse['data']
export interface SessionData extends UserData {
  accessToken: string
}

export async function createSession(session: RegisterUserResult): Promise<SessionData | null> {
  const cookieStore = await cookies()

  let res: Response
  try {
    res = await fetch(`${env.SERVER_API_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
    })
  }
  catch (err) {
    console.error('Error on network fetch user:', err)
    return null
  }

  if (!res.ok) {
    console.error('Error on API user', res.status, await res.text())
    return null
  }

  let userData: UserResponse
  try {
    userData = await res.json()
  }
  catch (err) {
    console.error('Invalid JSON:', err)
    return null
  }

  try {
    userDataSchema.parse(userData.data)
  }
  catch (error) {
    console.error('Invalid user data:', error)
    return null
  }

  const sessionData: SessionData = {
    accessToken: session.accessToken,
    ...userData.data,
  }

  cookieStore.set('session', JSON.stringify(sessionData), {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 60 * 60 * 24 * EXPIRES_IN * 1000),
    sameSite: 'lax',
    path: '/',
  })

  return sessionData
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')
  if (!session) return null

  const parsedSession: SessionData = JSON.parse(session.value)

  try {
    await jwtVerify(parsedSession.accessToken, JWT_SECRET)
    return parsedSession
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
