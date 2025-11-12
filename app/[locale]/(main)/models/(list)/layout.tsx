import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

import { ILang } from '@/src/app/model'
import { Title } from '@/src/shared/ui/Title'
import { MODELS_LAYOUT_ID } from '@/src/widgets/models'

import { Categories, Search } from './_ui'

type IProps = {
  children: React.ReactNode
  params: { locale: ILang }
}

export default function ModelsLayout({ params: { locale }, children }: IProps) {
  unstable_setRequestLocale(locale)

  const t = useTranslations('ModelsPage')

  return (
    <div className="container py-10">
      <Title className="mb-10" tag="h1">
        {t('heading')}
      </Title>

      <Search className="mb-5 max-md:mb-0" />

      <div className="flex gap-5 pt-5 max-lg:block">
        <div className="w-[300px] shrink-0 max-lg:w-auto">
          <Categories />
        </div>

        <div id={MODELS_LAYOUT_ID} className="flex grow flex-col max-lg:mt-8 max-md:mt-5">
          {children}
        </div>
      </div>
    </div>
  )
}
