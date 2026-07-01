'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { type RegisterSchema, registerSchema } from '@/lib/schemas/register-schema'
import { registerAction } from '@/actions/register-action'

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

export function RegisterForm() {
  const [state, formAction] = React.useActionState(registerAction, {
    message: '',
  })

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirm_password: '',
      phone_number: '',
      address: '',
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
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="Pierre" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Dupont" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Email</FormLabel>
              <FormControl>
                <Input type="email" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <Input type="password" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input
                  placeholder="0612345678"
                  type="tel"
                  inputMode="numeric"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <Input placeholder="10 rue de la Paix" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-center-safe max-md:w-full">S&apos;inscrire</Button>
      </form>
    </Form>
  )
}
