import Banner from '@/components/layout/banner'
import { Button } from '@/components/ui/button'
import { Spacing } from '@/components/ui/spacing'

export default function ContactPage() {
  return (
    <div>
      <Banner />
      <Spacing />
      <main className="container flex flex-col gap-4">
        <h1>Contactez nous</h1>
        <p>Pour toute question ou information, n&apos;hésitez pas à nous contacter.</p>
        <p>Pour passer &quot;instructeur&quot;, veuillez nous envoyer une demande par mail.</p>
        <p>
          Vous pouvez nous joindre par email à l&apos;adresse suivante :
          <Button variant="link" asChild>
            <a href="mailto:contact@skillfusion.com">contact@skillfusion.com</a>
          </Button>
        </p>
      </main>
    </div>
  )
}
