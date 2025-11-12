'use client'

import { useTranslations } from 'next-intl'
import { useFormStatus } from 'react-dom'
import { z } from 'zod'

import { useAuthUser } from '@/src/entities/auth-user/hooks/useAuthUser'
import { useActionForm } from '@/src/shared/hooks/useActionForm'
import { cn } from '@/src/shared/lib/tailwindUtils'
import { Button } from '@/src/shared/ui/Button'
import { Card, CardContent, CardFooter, CardHeader } from '@/src/shared/ui/Card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/shared/ui/Form'
import { Input } from '@/src/shared/ui/Input'

import { subscribePremium } from '../../api'

export type ISubscribeFormProps = {
  className?: string
}

const SubscribeForm = ({ className }: ISubscribeFormProps) => {
  const t = useTranslations()
  const { data } = useAuthUser()

  const { form, action } = useActionForm({
    action: subscribePremium,
    showToasts: true,
    resetFormAfterSuccess: true,

    formSchema: z.object({
      email: z.string().email(),
    }),

    initialValues: {
      email: '',
    },
  })

  return (
    <section className={cn(className)}>
      <Form {...form}>
        <form
          noValidate
          // @ts-ignore
          action={form.handleSubmit((values) => action({ author: data?.user?.id, ...values }))}
        >
          <Card>
            <CardHeader>
              <p className="font-main text-xs text-text-third">
                {t('GoPremiumPage.formDescription')}
              </p>
            </CardHeader>

            <CardContent>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Common.fields.input.email.title.you')}</FormLabel>
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
            </CardContent>

            <CardFooter className="-mt-2">
              <SubmitButton />
            </CardFooter>
          </Card>
        </form>
      </Form>
    </section>
  )
}

const SubmitButton = () => {
  const t = useTranslations()
  const { pending } = useFormStatus()

  return (
    <Button loading={pending} className="w-full" size="lg" variant="secondary" type="submit">
      {t('Common.actions.notify')}
    </Button>
  )
}

export default SubscribeForm
