import { LoginForm } from '@/components/forms/login-form'
import { Spacing } from '@/components/ui/spacing'

export default function LoginPage() {
  return (
    <main className="container flex flex-col items-center">
      <Spacing size="md" />
      <h1>Connexion</h1>
      <Spacing />
      <LoginForm />
    </main>
  )
}
