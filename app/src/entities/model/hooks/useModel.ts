'use client'

import useSWR from 'swr'

import { Model, User } from '@/src/shared/api/_models'
import { findModelById, getFindModelByIdKey } from '@/src/shared/api/swr'

import { useAuthUser } from '../../auth-user/hooks/useAuthUser'

export const useModel = (initialModel?: Model) => {
  const { data: dataUser } = useAuthUser()

  const { data, mutate, isLoading, isValidating } = useSWR(
    getFindModelByIdKey(initialModel?.id ?? ''),
    () => findModelById(initialModel?.id ?? ''),
    {
      isPaused() {
        return !initialModel
      },
      revalidateOnMount: true,
      fallbackData: initialModel,
    },
  )

  const author = data?.author as User

  return {
    data,
    mutate,
    isLoading,
    isValidating,
    isLoadingOrValidating: isLoading || isValidating,
    isMyModel: dataUser?.user?.id === author?.id,
  }
}
