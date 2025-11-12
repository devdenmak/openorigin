import useSWR, { Key, SWRConfiguration } from 'swr'

import { currentUser } from '@/src/entities/auth-user/api/fetch'
import apiClient, { SecondParameter } from '@/src/shared/api/base'

export const getCurrentUserKey = () => [`/api/users/me`] as const

export type CurrentUserQueryResult = NonNullable<Awaited<ReturnType<typeof currentUser>>>
export type CurrentUserQueryError = unknown

/**
 * @summary CurrentUser
 */
export const useCurrentUser = <TError = unknown>(options?: {
  swr?: SWRConfiguration<CurrentUserQueryResult, TError> & {
    swrKey?: Key
    enabled?: boolean
  }
  request?: SecondParameter<typeof apiClient>
}) => {
  const { swr: swrOptions, request: requestOptions } = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (() => (isEnabled ? getCurrentUserKey() : null))
  const swrFn = () => currentUser(requestOptions)

  const query = useSWR<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, {
    ...swrOptions,
  })

  return {
    swrKey,
    ...query,
  }
}
