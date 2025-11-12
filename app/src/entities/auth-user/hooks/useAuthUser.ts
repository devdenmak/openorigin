/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { preload } from 'swr'

import { PREVIEW_MODE_USER_NAME } from '@/src/app/config/constants'
import { currentUser } from '@/src/entities/auth-user/api/fetch'
import { getCurrentUserKey, useCurrentUser } from '@/src/entities/auth-user/api/swr'
import { getSessionToken, subscribe } from '@/src/shared/api/store'
import { isClient } from '@/src/shared/lib/isServerOrClient'

if (isClient) {
  const hasToken = getSessionToken()

  if (hasToken) {
    preload(getCurrentUserKey(), currentUser)
  }
}

export const useAuthUser = () => {
  const token = useSyncExternalStore(subscribe, getSessionToken, () => undefined)

  const tokenInit = token !== undefined
  const [enabled, setEnabled] = useState(true)

  const { data, mutate, isLoading, isValidating } = useCurrentUser({
    swr: { enabled: enabled && tokenInit && token !== null },
  })

  useEffect(() => {
    if (tokenInit) setEnabled(!!token)
  }, [token])

  useEffect(() => {
    if (tokenInit) setEnabled(!!data?.user)
  }, [data])

  const _isLoading = !tokenInit || isLoading

  return {
    isPreviewMode: data?.user?.username === PREVIEW_MODE_USER_NAME,
    data,
    mutate,
    isAuth: !!token && !!data?.user,
    isLoading: _isLoading,
    isValidating,
    isLoadingOrValidating: _isLoading || isValidating,
  }
}
