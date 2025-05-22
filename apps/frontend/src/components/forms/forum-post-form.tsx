'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { type PostSchema, postSchema } from '@/lib/schemas/post-schema'
import { createPostAction } from '@/actions/create-post-action'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ErrorMessage } from '@/components/ui/error-message'
import { Textarea } from '@/components/ui/textarea'

export function ForumPostForm({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [state, formAction, pending] = React.useActionState(createPostAction, {
    message: '',
  })

  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
      ...(state?.fields ?? {}),
    },
  })

  const formRef = React.useRef<HTMLFormElement>(null)

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(event) => {
          event.preventDefault()
          form.handleSubmit(() => {
            React.startTransition(() => {
              formAction(new FormData(formRef.current!))
            })
          })(event)
        }}
        className="flex flex-col gap-4 w-full max-w-lg"
      >
        {state?.message && (
          <ErrorMessage>
            {state.message}
          </ErrorMessage>
        )}
        {state?.issues && (
          <ul className="space-y-2">
            {state.issues.map(issue => (
              <li key={issue}>
                <ErrorMessage>
                  {issue}
                </ErrorMessage>
              </li>
            ))}
          </ul>
        )}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Titre</FormLabel>
              <FormControl>
                <Input type="text" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Contenu</FormLabel>
              <FormControl>
                <Textarea required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-center-safe max-md:w-full" disabled={pending || !isLoggedIn}>Publier</Button>
        <FormDescription>
          Vous devez être connecté pour créer une discussion.
        </FormDescription>
      </form>
    </Form>
  )
}
