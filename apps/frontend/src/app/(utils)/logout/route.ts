import { deleteSession } from '@/lib/session'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { env } from '~/env.config'

export async function GET() {
  revalidatePath('/', 'layout')

  await deleteSession()

  return NextResponse.redirect(`${env.WEB_ADDRESS}/`, {
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}
