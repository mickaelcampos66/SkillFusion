import { Spacing } from '@/components/ui/spacing'
import Image from 'next/image'
import { posts, messages } from '../../page'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { ResponseForumForm } from '@/components/forms/response-forum-form'
import { getSession } from '@/lib/session'

export default async function PostPage({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
  const user = await getSession()
  const { id } = await params
  const postId = Number.parseInt(id)
  const post = posts.find(post => post.id === postId)
  const postMessages = messages.filter(message => message.post_id === postId)

  return (
    <>
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
        <Image
          src="/images/image_atelier.webp"
          alt="Cours de bricolage"
          fill
          className="object-cover"
          priority
        />
      </div>
      <Spacing size="xs" />
      <main className="container flex flex-col gap-4">
        <h1>{post?.title}</h1>
        <Card className="w-full py-4">
          <CardContent>
            <p>{post?.content}</p>
          </CardContent>
        </Card>
        <h2 className="font-medium mt-2">Réponses</h2>
        <section className="w-full flex flex-col gap-4">
          {postMessages.length > 0
            ? (
                postMessages.map(message => (
                  <div key={message.id}>
                    <Card className="gap-0 py-4">
                      <CardContent>
                        <>
                          <p>{message.content}</p>
                        </>
                      </CardContent>
                    </Card>
                    <div className="flex gap-4 justify-end py-1">
                      <p className="text-sm font-medium">Utilisateur {message.user_id}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(message.created_at)}</p>
                    </div>
                  </div>
                ))
              )
            : (
                <p>Aucune réponse pour ce post.</p>
              )}
        </section>
        <Spacing size="xs" />
        <ResponseForumForm isConnected={!!user} />
      </main>
      <Spacing size="lg" />
    </>
  )
}
