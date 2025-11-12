import useSWR, { Key, SWRConfiguration } from 'swr'

import { modelsFavorites, modelsMy } from '@/src/entities/auth-model/api/fetch'
import { ListModelsParams } from '@/src/shared/api/_models'
import apiClient, { SecondParameter } from '@/src/shared/api/base'

export const getModelsFavoritesKey = (params?: ListModelsParams) =>
  [`/api/models/favorites`, ...(params ? [params] : [])] as const

export const getModelsMyKey = (params?: ListModelsParams) =>
  [`/api/models/my`, ...(params ? [params] : [])] as const

export type ModelsFavoritesQueryResult = NonNullable<Awaited<ReturnType<typeof modelsFavorites>>>
export type ModelsFavoritesQueryError = unknown

export type ModelsMyQueryResult = NonNullable<Awaited<ReturnType<typeof modelsMy>>>
export type ModelsMyQueryError = unknown

/**
 * @summary Models Favorites
 */
export const useModelsFavorites = <TError = unknown>(
  params?: ListModelsParams,
  options?: {
    swr?: SWRConfiguration<Awaited<ReturnType<typeof modelsFavorites>>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    request?: SecondParameter<typeof apiClient>
  },
) => {
  const { swr: swrOptions, request: requestOptions } = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (() => (isEnabled ? getModelsFavoritesKey(params) : null))
  const swrFn = () => modelsFavorites(params, requestOptions)

  const query = useSWR<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, {
    ...swrOptions,
  })

  return {
    swrKey,
    ...query,
  }
}

/**
 * @summary Models My
 */
export const useModelsMy = <TError = unknown>(
  params?: ListModelsParams,
  options?: {
    swr?: SWRConfiguration<Awaited<ReturnType<typeof modelsMy>>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    request?: SecondParameter<typeof apiClient>
  },
) => {
  const { swr: swrOptions, request: requestOptions } = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (() => (isEnabled ? getModelsMyKey(params) : null))
  const swrFn = () => modelsMy(params, requestOptions)

  const query = useSWR<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, {
    ...swrOptions,
  })

  return {
    swrKey,
    ...query,
  }
}
