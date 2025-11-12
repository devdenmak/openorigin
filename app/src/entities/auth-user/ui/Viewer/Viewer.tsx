'use client'

import { useTranslations } from 'next-intl'

import { BACKEND_URL } from '@/src/app/config/env'
import { cn } from '@/src/shared/lib/tailwindUtils'
import { Avatar } from '@/src/shared/ui/Avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/shared/ui/Dropdown'
import { Icon } from '@/src/shared/ui/Icon'
import { LocalizedLink } from '@/src/shared/ui/LocalizedLink'
import { Skeleton } from '@/src/shared/ui/Skeleton'

import { useAuthUser } from '../../hooks/useAuthUser'

export type IAuthProps = {
  className?: string
  slotToLogin: React.ReactNode
  slotLogoutButton: React.ReactNode
}

const Viewer = ({ className = '', slotToLogin, slotLogoutButton }: IAuthProps) => {
  const t = useTranslations('Common')

  const { data, isAuth, isLoading } = useAuthUser()

  if (isLoading) {
    return (
      <div className={cn('flex select-none items-center text-text-secondary', className)}>
        <div className="inline-flex shrink-0 items-center">
          <Skeleton className="mr-3 size-10 shrink-0 rounded-full max-lg:mr-0" />
          <Skeleton className="h-5 w-20 grow max-lg:hidden" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn(className)}>
      {isAuth ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer select-none items-center text-text-secondary">
              <div className="inline-flex shrink-0 items-center">
                <Avatar
                  size="sm"
                  className="mr-3 max-lg:mr-0"
                  src={data?.user?.avatar?.url ? `${BACKEND_URL}${data?.user?.avatar?.url}` : null}
                  alt={data?.user?.name ?? ''}
                />

                <div className="max-w-28 grow truncate font-main text-base font-medium max-lg:hidden">
                  {data?.user?.name}
                </div>
              </div>

              <Icon className="ml-2 shrink-0 max-lg:hidden" name="outlined/chevron-down" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem className="justify-end" asChild>
              <LocalizedLink href="/profile">
                <span>{t('navigation.myProfile')}</span>

                <Icon className="ml-2 mt-0.5" name="outlined/user"></Icon>
              </LocalizedLink>
            </DropdownMenuItem>

            <DropdownMenuItem className="justify-end" asChild>
              <LocalizedLink href="/settings">
                <span>{t('navigation.settings')}</span>

                <Icon className="ml-2 mt-0.5" name="outlined/settings"></Icon>
              </LocalizedLink>
            </DropdownMenuItem>

            <DropdownMenuItem className="justify-end" asChild>
              {slotLogoutButton}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div>{slotToLogin}</div>
      )}
    </div>
  )
}

export default Viewer
