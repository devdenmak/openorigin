import { mutate } from 'swr'

import { logout as authLogout } from '@/src/entities/auth-user/api/fetch'
import { deleteSessionToken } from '@/src/shared/api/store'
import { handleError } from '@/src/shared/lib/handleError'
import { logger } from '@/src/shared/lib/logger'

export async function logout() {
  mutate(() => true, undefined, false)

  try {
    authLogout()

    deleteSessionToken()
  } catch (e) {
    deleteSessionToken()

    logger.error(handleError(e))
  }
}
