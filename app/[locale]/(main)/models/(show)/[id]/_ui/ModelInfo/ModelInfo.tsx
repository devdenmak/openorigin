'use client'

import { useTranslations } from 'next-intl'

import { useModel } from '@/src/entities/model/hooks/useModel'
import { Model, Tag } from '@/src/shared/api/_models'
import { cn } from '@/src/shared/lib/tailwindUtils'
import { Button, buttonVariants } from '@/src/shared/ui/Button'
import { Icon } from '@/src/shared/ui/Icon'
import { LocalizedLink } from '@/src/shared/ui/LocalizedLink'

export type IModelInfoProps = {
  className?: string
  model: Model
}

const ModelInfo = ({ className, model }: IModelInfoProps) => {
  const t = useTranslations()

  const { data, isMyModel } = useModel(model)

  const _model = (data ?? {}) as Model
  const tag = _model.tag as Tag

  return (
    <section
      className={cn(className, 'rounded-2xl bg-surface-third p-6 max-md:p-3.5 max-md:rounded-xl')}
    >
      <div className="mb-5 flex items-center justify-between border-b border-supportive-primary pb-5">
        <div className="mr-4 shrink-0 font-headings text-xs font-semibold text-text-secondary">
          {t('ModelPage.tag')}
        </div>
        <div className="truncate rounded-3xl bg-surface-fourth px-4 py-2 font-main text-xs font-medium text-text-secondary">
          {tag.name}
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between border-b border-supportive-primary pb-5">
        <div className="mr-4 shrink-0 font-headings text-xs font-semibold text-text-secondary">
          {t('ModelPage.languages')}
        </div>
        <div className="truncate font-main text-base font-medium text-text-secondary">
          {_model.languages}
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between border-b border-supportive-primary pb-5">
        <div className="mr-4 shrink-0 font-headings text-xs font-semibold text-text-secondary">
          {t('ModelPage.license')}
        </div>
        <div className="truncate font-main text-base font-medium text-text-secondary">
          {_model.license}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="mr-4 shrink-0 font-headings text-xs font-semibold text-text-secondary">
          {t('ModelPage.finetuned')}
        </div>
        <div className="truncate font-main text-base font-medium text-text-secondary">
          {_model.finetunedFrom}
        </div>
      </div>

      <div className="pt-7">
        {isMyModel && (
          <LocalizedLink
            href={{
              pathname: `/models/[id]/edit`,
              params: { id: _model.id },
            }}
            className={cn(buttonVariants({ size: 'lg', variant: 'third' }), 'w-full mb-3')}
          >
            {t('Common.actions.editModelInfo')}
            <Icon className="ml-2" name="outlined/edit" />
          </LocalizedLink>
        )}

        <Button asChild variant="secondary" size="lg" className="w-full">
          <a target="_blank" href={_model.link}>
            {t('Common.actions.getThisModel')}
            <Icon className="ml-2" name="filled/flash" />
          </a>
        </Button>
      </div>
    </section>
  )
}

export default ModelInfo
