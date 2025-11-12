import { mutate } from 'swr'

import { login as authLogin } from '@/src/entities/auth-user/api/fetch'
import { getCurrentUserKey } from '@/src/entities/auth-user/api/swr'
import { LoginBody, LoginResponse } from '@/src/entities/auth-user/api/types'
import { setSessionToken } from '@/src/shared/api/store'
import { handleError } from '@/src/shared/lib/handleError'
import { logger } from '@/src/shared/lib/logger'
import { IBaseAction, IErrors } from '@/src/shared/model'

export async function login(prevState: IBaseAction, body: LoginBody) {
  try {
    const response = (await authLogin(body)) as LoginResponse & { errors?: IErrors }

    if (!response?.errors) {
      setSessionToken(response.token)

      mutate(getCurrentUserKey(), response)

      return {
        isError: false,
        isSuccess: true,
        data: response,
        errors: null,
      }
    } else {
      logger.error(handleError(response))
    }

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
