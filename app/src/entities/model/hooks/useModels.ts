'use client'

import useSWR from 'swr'

import { ListModelsParams } from '@/src/shared/api/_models'
import { ListModelsResult } from '@/src/shared/api/fetch'
import { getListModelsKey, listModels } from '@/src/shared/api/swr'

export const useModels = (query?: ListModelsParams, initialModels?: ListModelsResult) => {
  const { data, mutate, isLoading, isValidating } = useSWR(
    getListModelsKey(query),
    () => listModels(query),
    {
      revalidateOnMount: true,
      fallbackData: initialModels,
    },
  )

  return {
    data,
    mutate,
    isLoading,
    isValidating,
    isLoadingOrValidating: isLoading || isValidating,
  }
}
