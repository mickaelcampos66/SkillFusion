'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createCourseSchema, type CreateCourseSchema } from '@/lib/schemas/create-course-schema'
import { createCourseAction } from '@/actions/create-course-action'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ErrorMessage } from '@/components/ui/error-message'
import { Textarea } from '@/components/ui/textarea'
import { Category } from '@/app/(dashboard)/dashboard/courses/create/page'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CreateCourseForm({ categories }: { categories: Category[] }) {
  const [state, formAction, pending] = React.useActionState(createCourseAction, { message: '' })

  const form = useForm<CreateCourseSchema>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      name: '',
      description: '',
      content: '',
      image: '',
      level: '',
      // category_ids: [],
      ...(state?.fields ?? {}),
    },
  })

  const formRef = React.useRef<HTMLFormElement>(null)

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={form.handleSubmit(() => {
          React.startTransition(() => {
            const data = new FormData(formRef.current!)
            // data.append('category_ids', JSON.stringify(form.getValues('category_ids')))
            formAction(data)
          })
        })}
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Nom du cours</FormLabel>
              <FormControl>
                <Input required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Description</FormLabel>
              <FormControl>
                <Input required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Image (URL)</FormLabel>
              <FormControl>
                <Input required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Uncomment this section when categories are ready */}
        {/* <FormField
          control={form.control}
          name="category_ids"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégories</FormLabel>
              <FormControl>
                <MultiSelect
                  value={field.value || []}
                  onChange={field.onChange}
                  items={categories}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Niveau</FormLabel>
              <FormControl>
                <Input required {...field} />
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
        <Button type="submit" className="self-center-safe max-md:w-full" disabled={pending}>
          {pending ? 'Création...' : 'Créer le cours'}
        </Button>
      </form>
    </Form>
  )
}
