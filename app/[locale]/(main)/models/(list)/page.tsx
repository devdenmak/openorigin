import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { ILang } from '@/src/app/model'
import { mapQueryToPayload } from '@/src/entities/model/lib/mapQueryToPayload'
import { ModelsGrid } from '@/src/widgets/models/ui/ModelsGrid'

type IProps = {
  params: { locale: ILang }
  searchParams: {
    availability?: string
    tag_id?: string
    page?: string
    q?: string
  }
}

export async function generateMetadata({ params: { locale } }: IProps): Promise<Metadata> {
  unstable_setRequestLocale(locale)

  const t = await getTranslations('ModelsPage')

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function ModelsPage({ params: { locale }, searchParams }: IProps) {
  unstable_setRequestLocale(locale)

  const payloadQuery = mapQueryToPayload(searchParams)

  return <ModelsGrid className="flex grow flex-col justify-between" query={payloadQuery} />
}
