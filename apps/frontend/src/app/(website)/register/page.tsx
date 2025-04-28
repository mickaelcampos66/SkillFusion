import { RegisterForm } from '@/components/forms/register-form'
import { Button } from '@/components/ui/button'
import { Spacing } from '@/components/ui/spacing'
import { getSession } from '@/lib/session'
import Link from 'next/link'

export default async function Register() {
  const session = await getSession()

  if (session) {
    return (
      <main className="container flex flex-col items-center gap-8">
        <Spacing size="md" />
        <h1 className="text-center">Vous êtes déjà connecté !</h1>
        <p>Vous pouvez retourner à la page d&apos;accueil.</p>
        <Button asChild variant="link">
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
      </main>
    )
  }

  return (
    <main className="container flex flex-col items-center">
      <Spacing size="md" />
      <h1>Inscription</h1>
      <Spacing />
      <RegisterForm />
    </main>
  )
}
