import { Model } from '@/src/shared/api/_models'
import { IErrors } from '@/src/shared/model'

export type ModelsTotalResponse = {
  totalDocs: number
}

export type ModelWithFavorites = Model & { isFavorite: boolean; favoriteCount: number }

export type FavoriteApiResponse = {
  message?: string
  doc?: ModelWithFavorites
  errors?: IErrors
}
