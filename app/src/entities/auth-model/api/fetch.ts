import { ModelWithFavorites } from '@/src/entities/model/api/types'
import { ListModelsParams } from '@/src/shared/api/_models'
import apiClient, { SecondParameter } from '@/src/shared/api/base'

/**
 * @summary Models My
 */
export const modelsMy = (
  params?: ListModelsParams,
  options?: SecondParameter<typeof apiClient>,
) => {
  return apiClient<{ docs: ModelWithFavorites[] }>(
    { url: `/api/models/my`, method: 'GET', params },
    options,
  )
}

/**
 * @summary Models Favorites
 */
export const modelsFavorites = (
  params?: ListModelsParams,
  options?: SecondParameter<typeof apiClient>,
) => {
  return apiClient<{ docs: ModelWithFavorites[] }>(
    { url: `/api/models/favorites`, method: 'GET', params },
    options,
  )
}
