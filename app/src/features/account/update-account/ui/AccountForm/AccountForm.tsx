'use client'

import { useTranslations } from 'next-intl'
import { useFormStatus } from 'react-dom'
import { z } from 'zod'

import { useAuthUser } from '@/src/entities/auth-user/hooks/useAuthUser'
import { useActionForm } from '@/src/shared/hooks/useActionForm'
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

import { updateProfileAccount } from '../../api/updateAccount'

const AccountForm = () => {
  const { data } = useAuthUser()
  const t = useTranslations()

  const { form, action } = useActionForm({
    action: updateProfileAccount,

    formSchema: z.object({
      username: z.string().min(1),
      email: z.string().email(),
    }),

    initialValues: {
      username: data?.user?.username ?? '',
      email: data?.user?.email ?? '',
    },

    showToasts: true,
    firstInputFocus: false,
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Common.fields.input.username.title.simple')}</FormLabel>
                <FormControl>
                  <Input
                    inputSize="md"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('Common.fields.input.email.title.simple')}</FormLabel>
                <FormControl>
                  <Input
                    inputSize="md"
                    type="email"
                    placeholder={t('Common.fields.input.email.placeholder.enter')}
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

export default AccountForm
