import { mutate } from 'swr'

import { getModelsFavoritesKey, getModelsMyKey } from '@/src/entities/auth-model/api/swr'
import { modelsFavoriteAdd, modelsFavoriteRemove } from '@/src/entities/model/api/fetch'
import { FavoriteApiResponse } from '@/src/entities/model/api/types'
import { MODELS_TAG } from '@/src/entities/model/config'
import { ListModelsParams } from '@/src/shared/api/_models'
import { nextRevalidateTag, nextRevalidateTagByUrl } from '@/src/shared/api/revalidate'
import { getListModelsKey, getUpdateModelMutationKey } from '@/src/shared/api/swr'
import { handleError } from '@/src/shared/lib/handleError'
import { logger } from '@/src/shared/lib/logger'

export async function favoriteToggle(
  _: unknown,
  body: { id: string; query?: ListModelsParams; type: 'like' | 'unlike' },
) {
  try {
    const isLike = body.type === 'like'

    const response = isLike
      ? ((await modelsFavoriteAdd(body.id)) as FavoriteApiResponse)
      : ((await modelsFavoriteRemove(body.id)) as FavoriteApiResponse)

    if (!response.errors) {
      const modelKey = getUpdateModelMutationKey(body.id)

      const authUserModelsKey = getModelsMyKey()
      const authUserFavoriteKey = getModelsFavoritesKey()

      nextRevalidateTag(MODELS_TAG) // Server revalidate public list models
      mutate(getListModelsKey(body.query)) // SWR revalidate public list models

      nextRevalidateTagByUrl(modelKey[0]) // Server revalidate ONE public model
      mutate(modelKey) // SWR revalidate ONE puplic model

      mutate(authUserModelsKey) // SWR revalidate user list models
      mutate(authUserFavoriteKey) // SWR revalidate user favorite models
    } else {
      logger.error(handleError(response))
    }
  } catch (e) {
    logger.error(handleError(e))
  }
}
