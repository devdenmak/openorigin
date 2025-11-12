import { Model } from '@/src/shared/api/_models'
import { cn } from '@/src/shared/lib/tailwindUtils'

import { ModelDescription } from '../ModelDescription'
import { ModelGallery } from '../ModelGallery'
import { ModelInfo } from '../ModelInfo'
import { ModelPreview } from '../ModelPreview'

export type IModelPageProps = {
  className?: string
  slotCommentsWidget?: JSX.Element
  model: Model
}

const ModelPage = ({ className, model, slotCommentsWidget }: IModelPageProps) => {
  return (
    <article className={cn(className)}>
      <div className="mb-10 flex gap-10 max-xl:block max-md:mb-8">
        <div className="min-w-0 max-w-full grow max-xl:mb-10 max-md:mb-5">
          <ModelPreview className="mb-9 max-w-full max-md:mb-5" model={model} />
          <ModelDescription model={model} />
        </div>

        <div className="w-[520px] shrink-0 max-xl:w-auto">
          <ModelInfo model={model} />
        </div>
      </div>

      <ModelGallery className="mb-10 max-md:mb-8" model={model} />

      {slotCommentsWidget && <div className="mt-10">{slotCommentsWidget}</div>}
    </article>
  )
}

export default ModelPage
