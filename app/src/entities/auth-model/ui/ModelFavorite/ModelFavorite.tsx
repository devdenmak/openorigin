import { ModelWithFavorites } from '@/src/entities/model/api/types'
import { Tag, User } from '@/src/shared/api/_models'
import { LocalizedLink } from '@/src/shared/ui/LocalizedLink'
import { ModelCard } from '@/src/shared/ui/ModelCard'

export type IModelFavoriteProps = {
  idx: number | string
  model: ModelWithFavorites
  slotEdit: React.ReactNode
  slotDelete: React.ReactNode
  slotLike: React.ReactNode
}

const ModelFavorite = ({ idx, model, slotLike }: IModelFavoriteProps) => {
  const { emoji, updatedAt: updated, tag, name: title, id, author } = model

  const modelTag = tag as Tag
  const modelAuthor = author as User

  return (
    <ModelCard
      idx={idx}
      model={{ emoji, updated, tag: modelTag.name, title, id, userName: modelAuthor.username }}
      slotLike={slotLike}
      slotDetails={
        <LocalizedLink
          className="absolute inset-0 z-1"
          href={{ pathname: '/models/[id]', params: { id } }}
        />
      }
    />
  )
}

export default ModelFavorite
