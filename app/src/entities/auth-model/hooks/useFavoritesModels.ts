'use client'

import useSWR from 'swr'

import { modelsFavorites } from '@/src/entities/auth-model/api/fetch'
import { getModelsFavoritesKey } from '@/src/entities/auth-model/api/swr'

export const useFavoritesModels = () => {
  const { data, mutate, isLoading, isValidating } = useSWR(getModelsFavoritesKey(), () =>
    modelsFavorites(),
  )

  return {
    data,
    mutate,
    isLoading,
    isValidating,
    isLoadingOrValidating: isLoading || isValidating,
  }
}
