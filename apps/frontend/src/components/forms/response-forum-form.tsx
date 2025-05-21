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

export function ResponseForumForm({ isConnected }: { isConnected: boolean }) {
  const [state, formAction] = React.useActionState(responseForumAction, {
    message: '',
  })

  const form = useForm<ResponseForumSchema>({
    resolver: zodResolver(responseForumSchema),
    defaultValues: {
      message: '',
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
          name="message"
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
        <Button type="submit" disabled={!isConnected} className="self-end-safe max-md:w-full">Répondre</Button>
      </form>
    </Form>
  )
}
