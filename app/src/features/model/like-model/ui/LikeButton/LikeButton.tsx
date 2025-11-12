'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { useRouter } from '@/src/app/config/i18n'
import { useAuthUser } from '@/src/entities/auth-user/hooks/useAuthUser'
import { ListModelsParams } from '@/src/shared/api/_models'
import { cn } from '@/src/shared/lib/tailwindUtils'
import { Icon } from '@/src/shared/ui/Icon'

import { favoriteToggle } from '../../api'

export type ILikeButtonProps = {
  className?: string
  id: string
  isFavorite: boolean
  count: number
  query?: ListModelsParams
  hasLikeText?: boolean
}

const LikeButton = ({
  className,
  isFavorite,
  count,
  id,
  query,
  hasLikeText = false,
}: ILikeButtonProps) => {
  const t = useTranslations('Common')
  const [, toggleLike] = useFormState(favoriteToggle, null)
  const [isFavoriteState, setFavoriteState] = useState(isFavorite)
  const [favoriteCount, setFavoriteCount] = useState(count)
  const { isAuth } = useAuthUser()
  const router = useRouter()

  const handleAddLike = () => {
    if (!isAuth) {
      return router.push('/sign-in')
    }

    setFavoriteState(!isFavoriteState)
    setFavoriteCount(favoriteCount + 1)

    setTimeout(() => {
      // TODO: Think About It
      toggleLike({ id, query, type: 'like' })
    }, 1)
  }

  const handleRemoveLike = () => {
    if (!isAuth) {
      return router.push('/sign-in')
    }

    setFavoriteState(!isFavoriteState)
    setFavoriteCount(favoriteCount - 1)

    setTimeout(() => {
      // TODO: Think About It
      toggleLike({ id, query, type: 'unlike' })
    }, 1)
  }

  useEffect(() => {
    setFavoriteState(isFavorite)
  }, [isFavorite])

  useEffect(() => {
    setFavoriteCount(count)
  }, [count])

  return (
    <form
      className="shrink-0"
      action={() => (isFavoriteState ? handleRemoveLike() : handleAddLike())}
    >
      <LikeButtonSubmit
        className={cn(
          'group -m-1 flex items-center p-1 text-xs text-text-fourth transition-colors hover:text-supportive-fourth active:text-text-fourth justify-start text-left gap-2 flex-nowrap',
          isFavoriteState && 'text-supportive-fourth',
          className,
        )}
      >
        <Icon
          className="mt-0.5 shrink-0"
          name={isFavoriteState ? 'filled/liked' : 'outlined/like'}
        />
        <span className="min-w-2 font-main font-medium text-text-secondary">
          {hasLikeText
            ? t('like', {
                total: favoriteCount,
              })
            : favoriteCount}
        </span>
      </LikeButtonSubmit>
    </form>
  )
}

const LikeButtonSubmit = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} className={className} type="submit">
      {children}
    </button>
  )
}

export default LikeButton
