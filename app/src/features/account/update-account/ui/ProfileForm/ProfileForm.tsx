'use client'

import { useTranslations } from 'next-intl'
import { useFormStatus } from 'react-dom'
import { z } from 'zod'

import { useAuthUser } from '@/src/entities/auth-user/hooks/useAuthUser'
import { useActionForm } from '@/src/shared/hooks/useActionForm'
import { Button } from '@/src/shared/ui/Button'
import { FileUploader } from '@/src/shared/ui/FileUploader'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/shared/ui/Form'
import { Input } from '@/src/shared/ui/Input'
import { Textarea } from '@/src/shared/ui/Textarea'

import { updateProfile } from '../../api/updateProfile'

const ProfileForm = () => {
  const { data } = useAuthUser()
  const t = useTranslations()

  const { form, action } = useActionForm({
    action: updateProfile,

    formSchema: z.object({
      name: z.string().min(1),
      aiInterests: z.string(),
      githubUsername: z.string(),
      avatar: z
        .object({
          id: z.union([z.string(), z.number()]),
          filename: z.string(),
          url: z.string(),
          file: z.instanceof(File).nullable(),
        })
        .nullable(),
    }),

    initialValues: {
      name: data?.user?.name ?? '',
      aiInterests: data?.user?.aiInterests ?? '',
      githubUsername: data?.user?.githubUsername ?? '',
      avatar: data?.user?.avatar?.url
        ? {
            id: data?.user.avatar?.id ?? '',
            url: data?.user?.avatar?.url ?? '',
            filename: data?.user?.avatar?.filename ?? '',
            file: null,
          }
        : null,
    },

    showToasts: true,
    firstInputFocus: false,
  })

  return (
    <Form {...form}>
      <form
        noValidate
        // @ts-ignore
        action={form.handleSubmit((values) => action({ id: data?.user?.id, ...values }))}
        className="space-y-6 max-lg:space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Common.fields.input.name.title.simple')}</FormLabel>
              <FormControl>
                <Input
                  inputSize="md"
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
              <FormLabel>{t('Common.fields.input.githubUserName.title.optional')}</FormLabel>
              <FormControl>
                <Input
                  inputSize="md"
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
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Common.fields.input.avatar.title.simple')}</FormLabel>
              <FormControl>
                <FileUploader
                  value={field?.value ? [field?.value] : []}
                  onChange={(val) => field.onChange(val?.length ? val?.[0] : null)}
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
              <FormLabel>{t('Common.fields.input.blockchainInterest.title.simple')}</FormLabel>

              <FormControl>
                <Textarea
                  size="md"
                  placeholder={t('Common.fields.input.blockchainInterest.placeholder.simple')}
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
  )
}

const SubmitButton = () => {
  const t = useTranslations()
  const { pending } = useFormStatus()

  return (
    <Button className="!mt-4" loading={pending} size="sm" variant="fourth" type="submit">
      {t('Common.actions.saveChanges')}
    </Button>
  )
}

export default ProfileForm
