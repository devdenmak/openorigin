'use client'

import { ModelWithFavorites } from '@/src/entities/model/api/types'
import { useModels } from '@/src/entities/model/hooks/useModels'
import { ModelCard } from '@/src/entities/model/ui/ModelCard'
import { LikeButton } from '@/src/features/model/like-model/ui/LikeButton'
import { ListModelsParams } from '@/src/shared/api/_models'
import { ListModelsResult } from '@/src/shared/api/fetch'
import { LocalizedLink } from '@/src/shared/ui/LocalizedLink'

type IModelsGridClient = {
  models: ListModelsResult
  query?: ListModelsParams
}

export const ModelsGridClient = ({ models, query }: IModelsGridClient) => {
  const { data } = useModels(query, models)

  return (
    <>
      {data?.docs.map((item) => {
        const model = item as ModelWithFavorites

        return (
          <ModelCard
            idx={model.id}
            key={model.id}
            model={model}
            slotDetails={
              <LocalizedLink
                className="absolute inset-0 z-1"
                href={{ pathname: '/models/[id]', params: { id: model.id } }}
              />
            }
            slotLike={
              <LikeButton
                id={model.id}
                query={query}
                isFavorite={model.isFavorite}
                count={model.favoriteCount}
              />
            }
          />
        )
      })}
    </>
  )
}
