import { Spacing } from '@/components/ui/spacing'
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatDate } from '@/lib/utils'
import { env } from '~/env.config'
import { PostsResponse } from '@/types/post'
import { ForumPostForm } from '@/components/forms/forum-post-form'
import { getSession } from '@/lib/session'

async function getPosts(): Promise<PostsResponse> {
  const posts = await fetch(`${env.SERVER_API_URL}/api/posts`)
  if (!posts.ok) return { data: [] }
  return posts.json()
}

export default async function ForumPage() {
  const { data } = await getPosts()
  const user = await getSession()

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
      <main className="container flex flex-col items-center">
        <Spacing />
        <h1>Bienvenue sur le Forum</h1>
        <p>Partagez vos questions, idées, et discutez avec d&apos;autres membres.</p>
        <Spacing />
        <section className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Discussion</TableHead>
                <TableHead>Écrit par</TableHead>
                <TableHead>Reponses</TableHead>
                <TableHead className="text-right">Dernier message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((post) => {
                return (
                  <TableRow
                    key={post.id}
                    className="cursor-pointer"
                    href={`/forum/post/${post.id}`}
                  >
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.user?.firstname} {post.user?.lastname}</TableCell>
                    <TableCell>{post.commentsCount}</TableCell>
                    <TableCell className="text-right">
                      {post.lastCommentDate ? formatDate(post.lastCommentDate) : 'Aucun message'}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </section>
        <Spacing />
        <ForumPostForm isLoggedIn={!!user} />
        <Spacing />
      </main>
    </>
  )
}
