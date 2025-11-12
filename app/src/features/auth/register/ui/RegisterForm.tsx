/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { z } from 'zod'

import { afterLoginRedirectTo } from '@/src/entities/auth-user/config'
import { useActionForm } from '@/src/shared/hooks/useActionForm'
import { usePasswordValidation } from '@/src/shared/hooks/usePasswordValidation'
import { cn } from '@/src/shared/lib/tailwindUtils'
import { IErrors } from '@/src/shared/model'
import { Button } from '@/src/shared/ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormValidationPasswordMessage,
} from '@/src/shared/ui/Form'
import { Icon } from '@/src/shared/ui/Icon'
import { Input } from '@/src/shared/ui/Input'
import { LocalizedLink } from '@/src/shared/ui/LocalizedLink'
import { Textarea } from '@/src/shared/ui/Textarea'
import { Title } from '@/src/shared/ui/Title'

import { register } from '../api'

export function RegisterForm() {
  const t = useTranslations()

  const { zodSchema, passwordValidator } = usePasswordValidation()
  const [nextStep, setNextStep] = useState(false)

  const handleError = (errors: IErrors) => {
    if (!errors) return

    if (Array.isArray(errors)) {
      for (const err of errors) {
        const nested = err.data?.errors

        if (Array.isArray(nested)) {
          if (nested.some((e) => e.path === 'email')) {
            setNextStep(false)

            setTimeout(() => {
              form.setFocus('email')
            }, 100)

            return
          }
        }
      }
    }
  }

  const { form, action } = useActionForm({
    action: register,
    onError: handleError,

    redirectTo: afterLoginRedirectTo,

    formSchema: z.object({
      email: z.string().email(),
      password: zodSchema,
      username: z.string(),
      name: z.string(),
      githubUsername: z.string().optional(),
      aiInterests: z.string().optional(),
    }),

    initialValues: {
      email: '',
      password: '',
      aiInterests: '',
      githubUsername: '',
      name: '',
      username: '',
    },
  })

  const handleNextStep = () => {
    setNextStep(true)

    setTimeout(() => {
      form.setFocus('username')
    }, 100)
  }

  return (
    <div>
      <Form {...form}>
        <form
          noValidate
          className="relative"
          // @ts-ignore
          action={form.handleSubmit((values) => {
            if (!nextStep) {
              setNextStep(true)
              return
            }

            action(values)
          })}
        >
          <div className={cn('block', nextStep && 'hidden')}>
            <div className="mx-auto max-w-sm">
              <Title tag="h1" className="pb-2 text-center" size="sm">
                {t('SignUpPage.join')}
              </Title>

              <p className="pb-5 text-center font-main text-lg text-text-third">
                {t('SignUpPage.joinCommunity')}
              </p>

              <div className="space-y-2.5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Common.fields.input.email.title.simple')}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t('Common.fields.input.email.placeholder.enter')}
                          {...field}
                        />
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
                      <FormLabel>{t('Common.fields.input.password.title.create')}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t('Common.fields.input.password.placeholder.create')}
                          {...field}
                        />
                      </FormControl>
                      <FormValidationPasswordMessage
                        runtimeValidation={{
                          minLenghtValidate: passwordValidator.minLength(
                            form.getValues('password'),
                          ),
                          digitValidate: passwordValidator.digit(form.getValues('password')),
                          specialValidate: passwordValidator.specialChar(
                            form.getValues('password'),
                          ),
                          uppercaseValidate: passwordValidator.uppercase(
                            form.getValues('password'),
                          ),
                        }}
                      />
                    </FormItem>
                  )}
                />

                <Button
                  onClick={form.handleSubmit(() => handleNextStep())}
                  className="!mt-5 w-full"
                  size="lg"
                  variant="secondary"
                  type="button"
                >
                  {t('Common.actions.next')}
                  <Icon className="ml-2" name="outlined/chevron-right" />
                </Button>

                <div className="mt-3 justify-center text-center font-main text-base font-medium text-text-secondary">
                  {t('SignUpPage.haveAccount')}

                  <LocalizedLink
                    className="-mt-2 inline-flex px-2 font-headings text-base font-semibold text-button-eighth transition-colors hover:text-accent-300 active:text-button-eighth"
                    href="/sign-in"
                  >
                    {t('Common.actions.logIn')}
                  </LocalizedLink>
                </div>
              </div>
            </div>
          </div>

          <div className={cn('hidden', nextStep && 'block')}>
            <div className="mx-auto max-w-md">
              <Title tag="h2" className="pb-2 text-center" size="sm">
                {t('SignUpPage.completeProfile')}
              </Title>

              <p className="pb-5 text-center font-main text-lg text-text-third">
                {t('SignUpPage.lastStep')}
              </p>

              <div className="space-y-2.5">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Common.fields.input.username.title.simple')}</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder={t('Common.fields.input.username.placeholder.simple')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Common.fields.input.name.title.simple')}</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder={t('Common.fields.input.name.placeholder.fullName')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="githubUsername"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('Common.fields.input.githubUserName.title.optional')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder={t('Common.fields.input.githubUserName.placeholder.simple')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="aiInterests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('Common.fields.input.blockchainInterest.title.simple')}
                      </FormLabel>

                      <FormControl>
                        <Textarea
                          placeholder={t(
                            'Common.fields.input.blockchainInterest.placeholder.simple',
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Submit />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

const Submit = () => {
  const t = useTranslations()
  const { pending } = useFormStatus()

  return (
    <Button loading={pending} className="!mt-5 w-full" size="lg" type="submit">
      {t('Common.actions.createAccount')}
    </Button>
  )
}
