'use client'

import { useQueryState } from 'nuqs'

import { ModelListResponseResponse } from '@/src/shared/api/_models'
import { scrollToId } from '@/src/shared/lib/scrollTo'
import { Pagination } from '@/src/shared/ui/Pagination'

import { MODELS_LAYOUT_ID } from '../../config'

type ModelsGridPaginationProps = {
  className?: string
  models: ModelListResponseResponse
}

export const ModelsGridPagination = ({ models, className }: ModelsGridPaginationProps) => {
  const [, setPage] = useQueryState('page', {
    shallow: false,
    defaultValue: '1',
    clearOnDefault: true,
    history: 'push',
    scroll: false,
  })

  if (!models) return

  const handleChange = (page: number) => {
    scrollToId(MODELS_LAYOUT_ID)
    setPage(page.toString())
  }

  return (
    <Pagination
      className={className}
      currentPage={models.page}
      lastPage={models.totalPages}
      onChange={handleChange}
    />
  )
}
