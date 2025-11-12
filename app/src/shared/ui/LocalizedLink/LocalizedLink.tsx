import { ParsedUrlQueryInput } from 'querystring'
import { forwardRef } from 'react'

import { Link } from '@/src/app/config/i18n'
import { pathnames } from '@/src/app/config/pathnames'

type IPathname = keyof typeof pathnames
type IPathnameObj = {
  href?: string | null | undefined
  pathname?: IPathname
  query?: string | null | ParsedUrlQueryInput
  params?: ParsedUrlQueryInput | null
}

export type ILocalizedLink = {
  children?: React.ReactNode
  className?: string
  href: IPathname | IPathnameObj
  target?: '_blank' | '_self'
  onClick?: (e: React.MouseEvent) => void
  scroll?: boolean
}

const LocalizedLink = forwardRef<HTMLAnchorElement, ILocalizedLink>(
  ({ className = '', href, target, scroll = true, onClick, ...rest }, ref) => {
    return (
      <Link
        ref={ref}
        scroll={scroll}
        onClick={onClick}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        href={href as any}
        target={target}
        className={className}
        {...rest}
      />
    )
  },
)

LocalizedLink.displayName = 'LocalizedLink'

export default LocalizedLink
