import { useTranslations } from 'next-intl'

import { Model, Tag, User } from '@/src/shared/api/_models'
import { cn } from '@/src/shared/lib/tailwindUtils'
import { AvatarEmoji } from '@/src/shared/ui/AvatarEmoji'

export type IModelCardProps = {
  className?: string
  idx: number | string
  model: Model
  slotDetails?: React.ReactNode
  slotLike?: React.ReactNode
}

const ModelCard = ({ className, model, idx, slotDetails, slotLike }: IModelCardProps) => {
  const t = useTranslations('Common.date')

  const { emoji, author, name, tag, modelType: type, updatedAt } = model

  const dateTime = new Date(updatedAt)

  const modelAuthor = author as User
  const modelTag = tag as Tag

  return (
    <article
      className={cn(
        'group relative z-0 border border-transparent bg-surface-third p-3.5 rounded-2lg min-h-[130px] transition-colors hover:border-supportive-primary',
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="mr-5 flex min-w-0 max-w-full grow items-center">
          <AvatarEmoji size="lg" className="mr-3 shrink-0" emoji={emoji} idx={idx} />

          <div className="min-w-0 max-w-full">
            <h2 className="min-w-0 truncate font-headings text-xs font-semibold text-text-primary transition-colors group-hover:text-supportive-fourth group-active:text-text-primary">
              {name}
            </h2>
            <div className="mt-0.5 truncate font-main text-2xs font-medium text-text-fourth">
              {modelAuthor.username}
            </div>
          </div>
        </div>

        <div className="inline-flex shrink-0 truncate rounded-2xl bg-surface-fourth px-3 py-1 font-main text-2xs font-medium text-text-secondary">
          {modelTag.name}
        </div>
      </div>

      {type && <p className="mb-3 font-main text-xs font-normal text-text-secondary">{type}</p>}

      <div className="flex justify-between">
        <time
          className="mr-3 mt-0.5 block font-main text-2xs font-medium text-text-fifth"
          dateTime={updatedAt}
        >
          {t('updated', {
            updatedDate: dateTime,
          })}
        </time>

        <div className="relative z-10">{slotLike}</div>
      </div>

      {slotDetails}
    </article>
  )
}

export default ModelCard
