import { stringify } from 'qs'
import { Suspense } from 'react'

import { ListModelsParams } from '@/src/shared/api/_models'
import { deleteEmptyKeys } from '@/src/shared/lib/deleteEmptyKeys'
import { Skeleton } from '@/src/shared/ui/Skeleton'

import ModelsGridServer from './ModelsGridServer'

export type IModelsGridProps = {
  className?: string
  query?: ListModelsParams
}

const gridClasses = 'grid grid-cols-2 gap-3 max-lg:grid-cols-1'

const Fallback = () => {
  return (
    <section className={gridClasses}>
      {new Array(12).fill('').map((_, key) => (
        <Skeleton key={key} className="min-h-[130px] rounded-2lg" />
      ))}
    </section>
  )
}

const ModelsGrid = ({ className = '', query }: IModelsGridProps) => {
  const queryString = query ? stringify(deleteEmptyKeys(query)) : null

  return (
    <section className={className}>
      <Suspense key={queryString} fallback={<Fallback />}>
        <ModelsGridServer className={gridClasses} query={query} />
      </Suspense>
    </section>
  )
}

export default ModelsGrid
