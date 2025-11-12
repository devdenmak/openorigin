import { useTranslations } from 'next-intl'

import { cn } from '@/src/shared/lib/tailwindUtils'

import { AvatarEmoji } from '../AvatarEmoji'

type IModelCard = {
  idx: number | string
  model: {
    emoji: string
    updated: string
    tag: string
    title: string
    id: string
    userName?: string
  }
  slotLike?: React.ReactNode
  slotEdit?: React.ReactNode
  slotDelete?: React.ReactNode
  slotDetails?: React.ReactNode
}

export const ModelCard = ({
  slotLike,
  slotEdit,
  slotDelete,
  slotDetails,
  model,
  idx,
}: IModelCard) => {
  const { emoji, updated, tag, title, userName } = model
  const dateTime = new Date(updated)

  const t = useTranslations('Common.date')

  const hasControls = slotEdit || slotDelete

  return (
    <article className="group relative z-0 flex min-h-16 items-center justify-between rounded-2lg border border-transparent bg-surface-third p-2.5 pr-4 transition-colors hover:border-supportive-primary max-md:block">
      <div
        className={cn(
          'mr-5 flex min-w-0 max-w-full items-center max-md:mb-3 max-md:mr-0',
          hasControls && 'max-md:pr-14',
        )}
      >
        <AvatarEmoji className="mr-3 shrink-0" emoji={emoji} idx={idx} />
        <h3 className="min-w-0 truncate font-headings text-xs font-semibold text-text-primary transition-colors group-hover:text-supportive-fourth group-active:text-text-primary">
          {title}
        </h3>
        <div className="-mt-0.5 ml-3 text-xs font-medium text-text-fourth">{userName}</div>
      </div>

      <div className="flex shrink-0 items-center gap-4 max-md:grow">
        <time
          className="block font-main text-2xs font-medium text-text-fifth max-md:order-2 max-md:ml-auto max-md:shrink-0"
          dateTime={updated}
        >
          {t('upd', {
            updatedDate: dateTime,
          })}
        </time>

        <div className="inline-flex truncate rounded-2xl bg-surface-fourth px-3 py-1 font-main text-2xs font-medium text-text-secondary max-md:order-1 max-md:inline-block max-md:min-w-0 max-md:max-w-full">
          {tag}
        </div>

        {slotLike && <div className="relative z-10 max-md:order-3">{slotLike}</div>}

        {hasControls && (
          <div className="z-10 -ml-1 flex flex-nowrap max-md:absolute max-md:right-1 max-md:top-1">
            {slotEdit}
            {slotDelete}
          </div>
        )}
      </div>

      {slotDetails}
    </article>
  )
}
