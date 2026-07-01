import { Spacing } from '@/components/ui/spacing'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { ResponseForumForm } from '@/components/forms/response-forum-form'
import { getSession } from '@/lib/session'
import { env } from '~/env.config'
import type { PostResponse } from '@/types/post'

async function getPost(id: number): Promise<PostResponse | null> {
  const post = await fetch(`${env.SERVER_API_URL}/api/posts/${id}`)
  if (!post.ok) return null
  return post.json()
}

export default async function PostPage({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params
  const post = await getPost(Number.parseInt(id))
  const user = await getSession()

  if (!post || !post.data) {
    return (
      <main className="container flex flex-col gap-4">
        <h1>Post non trouvé</h1>
        <p>Le post n&apos;a pas été trouvé ou il a été supprimé.</p>
      </main>
    )
  }
  const { data } = post

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
        <h1>{data?.title}</h1>
        <Card className="w-full py-4">
          <CardContent>
            <p className="whitespace-pre-line">{data?.content}</p>
          </CardContent>
        </Card>
        <div className="flex gap-4 justify-end">
          <p className="text-sm font-medium">{data.user.firstname} {data.user.lastname}</p>
          <p className="text-sm text-muted-foreground">{formatDate(data.created_at)}</p>
        </div>
        <h2 className="font-medium mt-2">Réponses</h2>
        <section className="w-full flex flex-col gap-4">
          {data.comments && data.comments.length > 0
            ? (
                data.comments.map(comment => (
                  <div key={comment.id}>
                    <Card className="gap-0 py-4">
                      <CardContent>
                        <>
                          <p className="whitespace-pre-line">{comment.content}</p>
                        </>
                      </CardContent>
                    </Card>
                    <div className="flex gap-4 justify-end py-1">
                      <p className="text-sm font-medium">{comment.user.firstname} {comment.user.lastname}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(comment.created_at)}</p>
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
