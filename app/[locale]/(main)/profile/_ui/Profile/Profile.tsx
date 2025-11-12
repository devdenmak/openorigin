'use client'

import { useTranslations } from 'next-intl'

import { useAuthUser } from '@/src/entities/auth-user/hooks/useAuthUser'
import { cn } from '@/src/shared/lib/tailwindUtils'
import { Icon } from '@/src/shared/ui/Icon'
import { Skeleton } from '@/src/shared/ui/Skeleton'

export type IProfileProps = {
  className?: string
}

const Profile = ({ className = '' }: IProfileProps) => {
  const t = useTranslations('ProfilePage')
  const { data, isLoading } = useAuthUser()

  if (isLoading) {
    return (
      <section className={cn('flex justify-between pt-1 items-start', className)}>
        <div className="mr-3 grow">
          <Skeleton className="h-4 w-24 grow" />
          <Skeleton className="mt-2 h-4 max-w-2xl grow" />
        </div>

        <Skeleton className="h-8 w-28" />
      </section>
    )
  }

  return (
    <section className={cn('flex justify-between items-start', className)}>
      <div className="mr-3 grow">
        <h2 className="font-headings text-xs font-semibold">{t('pageTitle')}</h2>

        <p className="mt-1.5 max-w-2xl font-main text-xs font-normal text-text-third">
          {data?.user?.aiInterests || t('noInterests')}
        </p>
      </div>

      {data?.user?.githubUsername && (
        <a
          className="group -m-2 inline-flex min-w-0 max-w-full shrink-0 flex-nowrap items-center p-2 text-0"
          target="_blank"
          href={`https://github.com/${data?.user?.githubUsername}`}
        >
          <Icon className="mr-2 shrink-0 text-2xl" name="filled/github" />

          <span className="min-w-0 max-w-full truncate font-main text-xs text-text-secondary transition-colors group-hover:text-button-eighth group-active:text-text-secondary">
            {data?.user?.githubUsername}
          </span>
        </a>
      )}
    </section>
  )
}

export default Profile
