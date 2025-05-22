import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ForumPostForm } from './forms/forum-post-form'
import { getSession } from '@/lib/session'

export async function PostFormModal() {
  const user = await getSession()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Créer une nouvelle discussion</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une nouvelle discussion</DialogTitle>
          <DialogDescription>
            Remplissez le formulaire ci-dessous pour créer une nouvelle discussion.
          </DialogDescription>
        </DialogHeader>
        <ForumPostForm isLoggedIn={!!user} />
      </DialogContent>
    </Dialog>
  )
}
