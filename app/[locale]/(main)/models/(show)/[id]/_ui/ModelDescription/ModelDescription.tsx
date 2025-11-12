'use client'

import { useTranslations } from 'next-intl'

import { useModel } from '@/src/entities/model/hooks/useModel'
import { Model } from '@/src/shared/api/_models'
import { cn } from '@/src/shared/lib/tailwindUtils'
import { MarkdownOutput } from '@/src/shared/ui/MarkdownOutput'

export type IModelDescriptionProps = {
  className?: string
  model: Model
}

const ModelDescription = ({ className, model }: IModelDescriptionProps) => {
  const t = useTranslations('ModelPage')

  const { data } = useModel(model)
  const _model = (data ?? {}) as Model

  return (
    <section className={cn(className)}>
      {_model.modelType && (
        <div className="mb-9">
          <h2 className="mb-1.5 font-headings text-base font-semibold text-text-primary">
            {t('modelType')}
          </h2>

          <p className="font-main text-base font-normal text-text-secondary">{_model.modelType}</p>
        </div>
      )}

      {_model.description && (
        <div>
          <h2 className="mb-1.5 font-headings text-base font-semibold text-text-primary">
            {t('about')}
          </h2>

          <MarkdownOutput description={_model.description} />
        </div>
      )}
    </section>
  )
}

export default ModelDescription
