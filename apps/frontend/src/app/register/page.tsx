import { RegisterForm } from '@/components/forms/register-form'
import { Spacing } from '@/components/ui/spacing'

export default function Register() {
  return (
    <main className="container flex flex-col items-center">
      <Spacing size="md" />
      <h1>Inscription</h1>
      <Spacing />
      <RegisterForm />
    </main>
  )
}
