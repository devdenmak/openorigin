import { FavoriteApiResponse, ModelsTotalResponse } from '@/src/entities/model/api/types'
import apiClient, { SecondParameter } from '@/src/shared/api/base'

/**
 * @summary Models Total
 */
export const modelsTotal = (options?: SecondParameter<typeof apiClient>) => {
  return apiClient<ModelsTotalResponse>({ url: `/api/models/count`, method: 'GET' }, options)
}

/**
 * @summary Favorite Add
 */
export const modelsFavoriteAdd = (model: string, options?: SecondParameter<typeof apiClient>) => {
  return apiClient<FavoriteApiResponse>(
    { url: `/api/models/${model}/favorite`, method: 'POST' },
    options,
  )
}

/**
 * @summary Favorite Remove
 */
export const modelsFavoriteRemove = (
  model: string,
  options?: SecondParameter<typeof apiClient>,
) => {
  return apiClient<FavoriteApiResponse>(
    { url: `/api/models/${model}/unfavorite`, method: 'POST' },
    options,
  )
}
