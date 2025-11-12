'use client'

import { useTranslations } from 'next-intl'
import { useFormStatus } from 'react-dom'
import { z } from 'zod'

import { useAuthUser } from '@/src/entities/auth-user/hooks/useAuthUser'
import { useActionForm } from '@/src/shared/hooks/useActionForm'
import { usePasswordValidation } from '@/src/shared/hooks/usePasswordValidation'
import { Button } from '@/src/shared/ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/shared/ui/Form'
import { Input } from '@/src/shared/ui/Input'

import { changePassword } from '../api'

const ChangePasswordForm = () => {
  const t = useTranslations()
  const { data } = useAuthUser()
  const { zodSchema } = usePasswordValidation()

  const { form, action } = useActionForm({
    action: changePassword,

    formSchema: z
      .object({
        password: zodSchema,
        password_confirmation: z.string(),
      })
      .refine(({ password, password_confirmation }) => password === password_confirmation, {
        message: t('Common.fields.validation.passwordNotMatch'),
        path: ['password_confirmation'],
      }),

    initialValues: {
      password: '',
      password_confirmation: '',
    },

    showToasts: true,
    firstInputFocus: false,
    resetFormAfterSuccess: true,
  })

  return (
    <section>
      <Form {...form}>
        <form
          noValidate
          // @ts-ignore
          action={form.handleSubmit((values) => action({ id: data?.user?.id, ...values }))}
          className="space-y-6 max-lg:space-y-4"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Common.fields.input.password.title.new')}</FormLabel>
                <FormControl>
                  <Input
                    inputSize="md"
                    type="password"
                    placeholder={t('Common.fields.input.password.placeholder.enterNew')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Common.fields.input.password.title.confirm')}</FormLabel>
                <FormControl>
                  <Input
                    inputSize="md"
                    type="password"
                    placeholder={t('Common.fields.input.password.placeholder.confirmNew')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton />
        </form>
      </Form>
    </section>
  )
}

const SubmitButton = () => {
  const t = useTranslations()
  const { pending } = useFormStatus()
  const { isPreviewMode } = useAuthUser()

  return (
    <>
      {isPreviewMode && (
        <p className="max-w-[400px] font-main text-xs text-red-strong max-lg:text-sm">
          {t('Common.previeModeText')}
        </p>
      )}

      <Button
        disabled={isPreviewMode}
        className="!mt-4"
        loading={pending}
        size="sm"
        variant="fourth"
        type="submit"
      >
        {t('Common.actions.saveChanges')}
      </Button>
    </>
  )
}

export default ChangePasswordForm
