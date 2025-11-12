/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { toast } from 'sonner'

import { useAuthUser } from '@/src/entities/auth-user/hooks/useAuthUser'
import { IBaseAction } from '@/src/shared/model'
import { Button } from '@/src/shared/ui/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/ui/Dialog'
import { Title } from '@/src/shared/ui/Title'

import { deleteAccount } from '../api'

const DeleteAccountDialog = () => {
  const router = useRouter()
  const t = useTranslations()
  const { isPreviewMode, data } = useAuthUser()

  const [state, actionDelete] = useFormState<IBaseAction, string>(deleteAccount, {
    isError: false,
    isSuccess: false,
    data: null,
    errors: null,
  })

  useEffect(() => {
    if (state.isSuccess) {
      router.push('/sign-in')
      return
    }

    if (state.isError) {
      if (Array.isArray(state.errors) && state.errors.length > 0) {
        state.errors.forEach((error) => {
          toast.error(error.message || t('Common.toaster.error'))
        })
      } else {
        toast.error(t('Common.toaster.error'))
      }
    }
  }, [state.isSuccess, state.isError, state.errors])

  return (
    <section className="pb-2">
      <div className="mb-4 space-y-3">
        <Title size="xs">{t('SettingsAccount.deleteAccount')}</Title>
        <p className="max-w-[400px] font-main text-base text-text-fourth max-lg:text-sm">
          {t('SettingsAccount.deleteDescription')}
        </p>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">{t('Common.actions.deleteAccount')}</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('SettingsAccount.deleteAccount')}</DialogTitle>
            <DialogDescription>{t('SettingsAccount.deleteDialogText')}</DialogDescription>

            {isPreviewMode && (
              <DialogDescription className="text-red-strong">
                {t('Common.previeModeText')}
              </DialogDescription>
            )}
          </DialogHeader>

          <form action={() => actionDelete(data?.user?.id ?? '')}>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="w-full" size="lg" type="button" variant="third">
                  {t('SettingsAccount.deleteDialogClose')}
                </Button>
              </DialogClose>

              <SubmitButton />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}

const SubmitButton = () => {
  const t = useTranslations()
  const { pending } = useFormStatus()
  const { isPreviewMode } = useAuthUser()

  return (
    <Button
      disabled={isPreviewMode}
      loading={pending}
      className="w-full"
      size="lg"
      type="submit"
      variant="secondary"
    >
      {t('SettingsAccount.deleteDialogConfirm')}
    </Button>
  )
}

export default DeleteAccountDialog
