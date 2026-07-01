'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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
import { ErrorMessage } from '@/components/ui/error-message'
import { responseForumAction } from '@/actions/reponse-forum-action'
import { responseForumSchema, type ResponseForumSchema } from '@/lib/schemas/response-forum-schema'
import { Textarea } from '@/components/ui/textarea'
import { useParams } from 'next/navigation'

export function ResponseForumForm({ isConnected }: { isConnected: boolean }) {
  const { id } = useParams()
  const [state, formAction, pending] = React.useActionState(responseForumAction, {
    message: '',
  })

  const form = useForm<ResponseForumSchema>({
    resolver: zodResolver(responseForumSchema),
    defaultValues: {
      comment: '',
      ...(state?.fields ?? {}),
    },
  })

  const formRef = React.useRef<HTMLFormElement>(null)

  React.useEffect(() => {
    if (!pending && !state?.message && !state?.issues) {
      form.reset()
    }
  }, [pending, state?.message, state?.issues, form])

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={form.handleSubmit(() => {
          React.startTransition(() => {
            const data = new FormData(formRef.current!)
            formAction(data)
          })
        })}
        className="flex flex-col gap-2 w-full"
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
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Répondre</FormLabel>
              <FormControl>
                <Textarea required disabled={!isConnected} className="rounded-xl" {...field} />
              </FormControl>
              {!isConnected && (
                <FormDescription className="text-destructive text-xs">Vous devez être connecté pour laisser un message.</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <input type="hidden" name="post_id" value={id} />
        <Button type="submit" disabled={!isConnected || pending} className="self-end-safe max-md:w-full">
          {pending ? 'Envoi...' : 'Envoyer'}
        </Button>
      </form>
    </Form>
  )
}
