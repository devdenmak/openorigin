'use client'

import { useTranslations } from 'next-intl'

import { ModelWithFavorites } from '@/src/entities/model/api/types'
import { useModel } from '@/src/entities/model/hooks/useModel'
import { LikeButton } from '@/src/features/model/like-model/ui/LikeButton'
import { Model, User } from '@/src/shared/api/_models'
import { cn } from '@/src/shared/lib/tailwindUtils'
import { AvatarEmoji } from '@/src/shared/ui/AvatarEmoji'
import { Title } from '@/src/shared/ui/Title'

export type IModelPreviewProps = {
  className?: string
  model: Model
}

const ModelPreview = ({ className, model }: IModelPreviewProps) => {
  const t = useTranslations('Common')

  const { data } = useModel(model)

  const _model = (data ?? {}) as ModelWithFavorites

  const dateTime = new Date(_model.updatedAt)
  const author = _model?.author as User

  return (
    <section className={cn(className)}>
      <div className="flex gap-5 max-md:relative max-md:gap-4">
        <AvatarEmoji
          idx={_model.id}
          key={_model.id}
          className="shrink-0"
          size="xl"
          emoji={_model.emoji}
        />

        <div className="mt-3.5 min-w-0 grow  max-md:mt-2">
          <div className="flex items-center justify-between max-md:flex-col max-md:items-start">
            <div className="mr-6 min-w-0 max-md:mb-6 max-md:mr-0 max-md:max-w-full">
              <Title className="mb-2.5 truncate max-md:mb-1.5" size="md" tag="h1">
                {_model.name}
              </Title>

              <div className="flex gap-x-5">
                {author && (
                  <div className="relative flex min-w-0 max-w-full font-main text-lg font-normal text-text-third max-md:text-base">
                    <span className="max-w-full truncate">{author.username}</span>

                    <span className="absolute -right-3 top-2.5 block size-1 rounded-full bg-text-third max-md:hidden"></span>
                  </div>
                )}

                <time
                  className="block shrink-0 font-main text-lg font-normal text-text-third max-md:absolute max-md:bottom-0 max-md:left-0 max-md:truncate max-md:text-base"
                  dateTime={author.updatedAt}
                >
                  {t('date.lastUpdated', {
                    updatedDate: dateTime,
                  })}
                </time>
              </div>
            </div>

            <div className="shrink-0 max-md:ml-auto">
              <LikeButton
                hasLikeText
                className="flex-row-reverse text-base"
                id={_model.id}
                isFavorite={_model.isFavorite}
                count={_model.favoriteCount}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ModelPreview
