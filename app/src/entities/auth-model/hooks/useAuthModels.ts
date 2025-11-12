'use client'

import useSWR from 'swr'

import { modelsMy } from '@/src/entities/auth-model/api/fetch'
import { getModelsMyKey } from '@/src/entities/auth-model/api/swr'

export const useAuthModels = () => {
  const { data, mutate, isLoading, isValidating } = useSWR(getModelsMyKey(), () => modelsMy())

  return {
    data,
    mutate,
    isLoading,
    isValidating,
    isLoadingOrValidating: isLoading || isValidating,
  }
}
