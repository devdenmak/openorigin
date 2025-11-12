/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { z } from 'zod'

import { useActionForm } from '@/src/shared/hooks/useActionForm'
import { usePasswordValidation } from '@/src/shared/hooks/usePasswordValidation'
import { cn } from '@/src/shared/lib/tailwindUtils'
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
import { Title } from '@/src/shared/ui/Title'

import { forgotPassword, resetPassword } from '../api'

export function ResetPasswordForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const t = useTranslations()
  const { zodSchema, passwordValidator } = usePasswordValidation()

  const { form: formEmail, action: emailAction } = useActionForm({
    action: forgotPassword,
    onSuccess: () => handleToSecondStep(),

    formSchema: z.object({
      email: z.string().email(),
    }),

    initialValues: {
      email: '',
    },
  })

  const { form: formReset, action: resetPasswordAction } = useActionForm({
    action: resetPassword,
    onSuccess: () => handleToThirdStep(),

    formSchema: z
      .object({
        token: z
          .string()
          .trim()
          .refine((s) => /^\d{6}$/.test(s) || /^[0-9a-f]{40}$/i.test(s), {
            message: t('Common.fields.validation.tokenInvalid'),
          }),
        email: z.string().email(),
        password: zodSchema,
        password_confirmation: z.string(),
      })
      .refine(({ password, password_confirmation }) => password === password_confirmation, {
        message: t('Common.fields.validation.passwordNotMatch'),
        path: ['password_confirmation'],
      }),

    initialValues: {
      token: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  })

  const handleToFirstStep = () => {
    setStep(1)
    formReset.resetField('token')

    setTimeout(() => {
      formEmail.setFocus('email')
    }, 100)
  }

  const handleToSecondStep = () => {
    formReset.setValue('email', formEmail.getValues('email'))
    setStep(2)

    setTimeout(() => {
      formReset.setFocus('token')
    }, 100)
  }

  const handleToThirdStep = () => {
    setStep(3)
  }

  return (
    <section>
      <div className={cn('hidden', (step === 1 || step === 2) && 'block')}>
        <Title tag="h1" className="pb-5 text-center" size="sm">
          {t('ResetPasswordPage.passwordReset')}
        </Title>

        <p className="pb-5 text-center font-main text-lg text-text-third">
          {t('ResetPasswordPage.enterEmailText')}
        </p>

        <div className={cn('hidden', step === 1 && 'block')}>
          <Form {...formEmail}>
            <form
              noValidate
              // @ts-ignore
              action={formEmail.handleSubmit((values) => emailAction(values))}
              className="space-y-5"
            >
              <FormField
                control={formEmail.control}
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

              <SubmitButtonEmail />
            </form>
          </Form>
        </div>

        <div className={cn('hidden', step === 2 && 'block')}>
          <Form {...formReset}>
            <form
              noValidate
              // @ts-ignore
              action={formReset.handleSubmit((values) => resetPasswordAction(values))}
              className="space-y-3"
            >
              <FormField
                control={formReset.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Common.fields.input.code.title.simple')}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={t('Common.fields.input.code.placeholder.simple')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formReset.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Common.fields.input.password.title.newEnter')}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t('Common.fields.input.password.placeholder.new')}
                        {...field}
                      />
                    </FormControl>
                    <FormValidationPasswordMessage
                      runtimeValidation={{
                        minLenghtValidate: passwordValidator.minLength(
                          formReset.getValues('password'),
                        ),
                        digitValidate: passwordValidator.digit(formReset.getValues('password')),
                        specialValidate: passwordValidator.specialChar(
                          formReset.getValues('password'),
                        ),
                        uppercaseValidate: passwordValidator.uppercase(
                          formReset.getValues('password'),
                        ),
                      }}
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={formReset.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Common.fields.input.password.title.repeat')}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t('Common.fields.input.password.placeholder.repeat')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SubmitButtonNewPassword />

              <Button
                onClick={handleToFirstStep}
                className="!mt-2 hidden w-full"
                size="lg"
                variant="secondary"
                type="button"
              >
                <Icon className="mr-2" name="outlined/chevron-left" />
                {t('Common.actions.back')}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <div className={cn('hidden', step === 3 && 'block', 'text-center')}>
        <div className="mb-6 flex justify-center">
          <div className="inline-flex size-20 items-center justify-center rounded-full bg-gradient-accent-to-r">
            <div className="flex size-16 items-center justify-center rounded-full bg-accent-300 text-3xl text-white">
              <Icon name="filled/lock" />
            </div>
          </div>
        </div>

        <Title tag="h2" className="pb-3 text-center" size="sm">
          {t('ResetPasswordPage.successResetTitle')}
        </Title>

        <p className="pb-5 text-center font-main text-lg text-text-third">
          {t('ResetPasswordPage.successResetText')}
        </p>

        <Button asChild className="!mt-2" size="lg" variant="default">
          <LocalizedLink href="/sign-in">{t('Common.actions.loginWithNewPassword')}</LocalizedLink>
        </Button>
      </div>
    </section>
  )
}

const SubmitButtonEmail = () => {
  const t = useTranslations()
  const { pending } = useFormStatus()

  return (
    <Button loading={pending} className="w-full" size="lg" variant="secondary" type="submit">
      {t('Common.actions.sendCode')}
      <Icon className="ml-2" name="outlined/chevron-right" />
    </Button>
  )
}

const SubmitButtonNewPassword = () => {
  const t = useTranslations()
  const { pending } = useFormStatus()

  return (
    <Button loading={pending} className="!mt-5 w-full" size="lg" variant="default" type="submit">
      {t('Common.actions.setNewPassword')}
    </Button>
  )
}
