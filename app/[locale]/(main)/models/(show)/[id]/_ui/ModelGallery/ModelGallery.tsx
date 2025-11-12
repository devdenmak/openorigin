'use client'

import { BACKEND_URL } from '@/src/app/config/env'
import { useModel } from '@/src/entities/model/hooks/useModel'
import { Image, Model, ModelImagesItem } from '@/src/shared/api/_models'
import { cn } from '@/src/shared/lib/tailwindUtils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/shared/ui/Carousel'
import { Image as NextImage } from '@/src/shared/ui/Image'

export type IModelGalleryProps = {
  className?: string
  model: Model
}

const ModelGallery = ({ className, model }: IModelGalleryProps) => {
  const { data } = useModel(model)

  const _model = (data ?? {}) as Model
  const hasGallery = _model.images && _model.images.length

  if (!hasGallery) return

  const gallery = _model.images as ModelImagesItem[]

  return (
    <section className={cn(className)}>
      <Carousel>
        <CarouselPrevious />

        <CarouselContent>
          {gallery.map((item, key) => {
            const slide = item as Image

            return (
              <CarouselItem key={slide.id} className="basis-1/4 max-xl:basis-1/3 max-md:basis-1/2">
                <NextImage
                  className="overflow-hidden rounded-md"
                  fillParent
                  alt={`slide-${key}`}
                  src={`${BACKEND_URL}${slide.url}`}
                  width={350}
                  height={219}
                />
              </CarouselItem>
            )
          })}
        </CarouselContent>

        <CarouselNext />
      </Carousel>
    </section>
  )
}

export default ModelGallery
