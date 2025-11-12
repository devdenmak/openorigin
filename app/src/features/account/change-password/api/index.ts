import { mutate } from 'swr'

import { refreshToken } from '@/src/entities/auth-user/api/fetch'
import { getCurrentUserKey } from '@/src/entities/auth-user/api/swr'
import { RefreshTokenResponse } from '@/src/entities/auth-user/api/types'
import { UserPatchRequestBodyBody, UserResponseResponse } from '@/src/shared/api/_models'
import { updateUser } from '@/src/shared/api/fetch'
import { setSessionToken } from '@/src/shared/api/store'
import { handleError } from '@/src/shared/lib/handleError'
import { logger } from '@/src/shared/lib/logger'
import { IBaseAction, IErrors } from '@/src/shared/model'

export async function changePassword(
  prevState: IBaseAction,
  body: UserPatchRequestBodyBody & { id: string },
) {
  try {
    const response = (await updateUser(body.id, body)) as unknown as {
      doc: UserResponseResponse
      errors?: IErrors
    }

    if (!response?.errors) {
      const response = (await refreshToken()) as RefreshTokenResponse & { errors?: IErrors }

      if (!response?.errors) {
        const { user, message, exp, refreshedToken, strategy } = response

        setSessionToken(refreshedToken)
        mutate(getCurrentUserKey(), { user, message, exp, token: refreshedToken, strategy })

        return {
          isError: false,
          isSuccess: true,
          data: response.user,
          errors: null,
        }
      }

      logger.error(handleError(response))

      return {
        isError: true,
        isSuccess: false,
        data: response,
        errors: response?.errors,
      }
    }

    logger.error(handleError(response))

    return {
      isError: true,
      isSuccess: false,
      data: response,
      errors: response?.errors,
    }
  } catch (e) {
    logger.error(handleError(e))

    return prevState
  }
}
