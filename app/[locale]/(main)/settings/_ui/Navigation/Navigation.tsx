'use client'

import { useTranslations } from 'next-intl'

import { usePathname } from '@/src/app/config/i18n'
import { cn } from '@/src/shared/lib/tailwindUtils'
import { LocalizedLink } from '@/src/shared/ui/LocalizedLink'

export type INavigationProps = {
  className?: string
}

const Navigation = ({ className = '' }: INavigationProps) => {
  const localizedPathname = usePathname()
  const t = useTranslations('Common.navigation')

  return (
    <ul className={cn('space-y-2 max-lg:grid max-lg:space-y-0 max-lg:grid-cols-3', className)}>
      <li className="max-lg:text-center">
        <LocalizedLink
          className={cn(
            'block rounded-md p-4 font-main text-base font-medium text-text-fourth hover:text-button-eighth active:text-text-fourth transition-colors',
            localizedPathname === '/settings' &&
              'bg-gradient-solid-to-r !text-text-primary max-lg:bg-gradient-solid-to-b',
          )}
          href="/settings"
        >
          {t('profile')}
        </LocalizedLink>
      </li>
      <li className="max-lg:text-center">
        <LocalizedLink
          className={cn(
            'block rounded-md p-4 font-main text-base font-medium text-text-fourth hover:text-button-eighth active:text-text-fourth transition-colors',
            localizedPathname.startsWith('/settings/account') &&
              'bg-gradient-solid-to-r !text-text-primary max-lg:bg-gradient-solid-to-b',
          )}
          href="/settings/account"
        >
          {t('account')}
        </LocalizedLink>
      </li>
    </ul>
  )
}

export default Navigation
