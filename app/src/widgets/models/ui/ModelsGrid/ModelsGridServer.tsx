import { getTranslations } from 'next-intl/server'

import { MODELS_TAG } from '@/src/entities/model/config'
import { ListModelsParams } from '@/src/shared/api/_models'
import { listModels } from '@/src/shared/api/fetch'
import { ModelsGridClient } from '@/src/widgets/models/ui/ModelsGrid/ModelsGridClient'

import { ModelsGridPagination } from './ModelsGridPagination'

export type IModelsGridProps = {
  className?: string
  query?: ListModelsParams
  disablePagination?: boolean
}

const ModelsGridServer = async ({
  query,
  disablePagination = false,
  className,
}: IModelsGridProps) => {
  const t = await getTranslations('Common')

  const response = await listModels(query, {
    fetchConfig: {
      tags: [MODELS_TAG],
    },
  })

  const hasPagination =
    response.limit && response.totalDocs ? response.limit < response.totalDocs : false
  const showPagination = !disablePagination && hasPagination

  return (
    <>
      <section className={className}>
        {response.docs.length ? (
          <ModelsGridClient models={response} query={query} />
        ) : (
          <>{t('noData')}</>
        )}
      </section>

      {showPagination && (
        <ModelsGridPagination className="mt-8 flex justify-center" models={response} />
      )}
    </>
  )
}

export default ModelsGridServer
