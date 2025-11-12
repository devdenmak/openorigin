import { Model, Tag } from '@/src/shared/api/_models'
import { LocalizedLink } from '@/src/shared/ui/LocalizedLink'
import { ModelCard as ModelItem } from '@/src/shared/ui/ModelCard'

export type IModelCardProps = {
  idx: number | string
  model: Model
  slotEdit: React.ReactNode
  slotDelete: React.ReactNode
  slotLike: React.ReactNode
}

const ModelCard = ({ model, idx, slotEdit, slotDelete, slotLike }: IModelCardProps) => {
  const { emoji, updatedAt: updated, tag, name: title, id } = model

  const modelTag = tag as Tag

  return (
    <ModelItem
      idx={idx}
      model={{ emoji, updated, tag: modelTag.name, title, id }}
      slotEdit={slotEdit}
      slotDelete={slotDelete}
      slotDetails={
        <LocalizedLink
          className="absolute inset-0 z-1"
          href={{ pathname: '/models/[id]', params: { id } }}
        />
      }
      slotLike={slotLike}
    />
  )
}

export default ModelCard
