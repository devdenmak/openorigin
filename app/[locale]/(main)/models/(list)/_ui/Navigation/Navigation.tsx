'use client'

import { SyntheticEvent } from 'react'

import { useModelsQuery } from '@/src/entities/model/hooks/useModelsQuery'
import { CategoryTagsDocsItem, Tag } from '@/src/shared/api/_models'
import { cn } from '@/src/shared/lib/tailwindUtils'
import { LocalizedLink } from '@/src/shared/ui/LocalizedLink'

export type INavigationProps = {
  className?: string
  tags: CategoryTagsDocsItem[]
}

const Navigation = ({ className = '', tags }: INavigationProps) => {
  const { query, setQuery } = useModelsQuery()

  const availability = query.availability ? { availability: query.availability } : {}

  const handleClick = (e: SyntheticEvent, id: number) => {
    if (id.toString() === query.tag_id) {
      e.preventDefault()

      setQuery({
        tag_id: null,
        ...availability,
      })
    }
  }

  return (
    <ul className={cn('flex gap-2 flex-wrap', className)}>
      {tags.map((item) => {
        const { id, name } = item as Tag

        return (
          <li key={id}>
            <LocalizedLink
              scroll={false}
              className={cn(
                'inline-flex items-center justify-center py-1 px-4 pb-1.5 border border-supportive-primary rounded-3xl bg-surface-third text-text-secondary font-medium min-h-9 text-xs hover:bg-surface-fourth hover:text-text-primary transition-colors active:bg-surface-third',
                query.tag_id === id.toString() && '!bg-accent-300 !border-accent-300 !text-white',
                query.tag_id && query.tag_id !== id.toString() && 'text-text-fifth',
              )}
              href={{
                pathname: '/models',
                query: {
                  tag_id: id,
                  ...availability,
                },
              }}
              onClick={(e) => handleClick(e, Number(id))}
            >
              <span>{name}</span>
            </LocalizedLink>
          </li>
        )
      })}
    </ul>
  )
}

export default Navigation
