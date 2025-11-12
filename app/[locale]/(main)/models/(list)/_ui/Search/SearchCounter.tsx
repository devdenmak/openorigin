import { useTranslations } from 'next-intl'

import { modelsTotal } from '@/src/entities/model/api/fetch'
import { cn } from '@/src/shared/lib/tailwindUtils'

export type ISearchCounterProps = {
  className?: string
}

const SearchCounter = async ({ className = '' }: ISearchCounterProps) => {
  const t = useTranslations('ModelsPage')
  const { totalDocs } = await modelsTotal()

  return (
    <h3 className={cn('font-headings text-base font-semibold text-text-fourth', className)}>
      {t('available', { total: totalDocs })}
    </h3>
  )
}

export default SearchCounter
