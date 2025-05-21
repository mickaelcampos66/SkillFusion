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
import { PostFormModal } from '@/components/forum-post-form-modal'

export const posts = [
  {
    id: 1,
    title: 'Comment réparer une étagère cassée ?',
    content: 'Bonjour, j\'ai une étagère en bois qui s\'est cassée. Avez-vous des conseils pour la réparer ?',
    created_at: new Date('2025-04-01T10:00:00Z'),
    updated_at: new Date('2025-04-01T10:00:00Z'),
    user_id: 1,
  },
  {
    id: 2,
    title: 'Idées pour décorer une petite chambre',
    content: 'Je cherche des idées pour décorer une petite chambre sans trop encombrer l\'espace.',
    created_at: new Date('2025-04-15T14:30:00Z'),
    updated_at: new Date('2025-04-15T14:30:00Z'),
    user_id: 2,
  },
]

export const messages = [
  {
    id: 1,
    content: 'Vous pouvez utiliser de la colle à bois et des serre-joints pour réparer l\'étagère.',
    created_at: '2025-04-01T11:00:00Z',
    updated_at: '2025-04-01T11:00:00Z',
    user_id: 2,
    post_id: 1,
  },
  {
    id: 2,
    content: 'Essayez d\'ajouter des miroirs pour donner une impression d\'espace.',
    created_at: '2025-04-15T15:00:00Z',
    updated_at: '2025-04-15T15:00:00Z',
    user_id: 3,
    post_id: 2,
  },
]

export default function ForumPage() {
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
              {posts.map((post) => {
                const postMessages = messages.filter(message => message.post_id === post.id)
                const lastMessage = postMessages[postMessages.length - 1]

                return (
                  <TableRow
                    key={post.id}
                    className="cursor-pointer"
                    href={`/forum/post/${post.id}`}
                  >
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{`Utilisateur ${post.user_id}`}</TableCell>
                    <TableCell>{postMessages.length}</TableCell>
                    <TableCell className="text-right">
                      {lastMessage ? formatDate(lastMessage.created_at) : 'Aucun message'}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </section>
        <Spacing />
        <PostFormModal />
        <Spacing />
      </main>
    </>
  )
}
