import { mutate } from 'swr'

import { login } from '@/src/entities/auth-user/api/fetch'
import { getCurrentUserKey } from '@/src/entities/auth-user/api/swr'
import { LoginResponse } from '@/src/entities/auth-user/api/types'
import { NewUserResponseResponse, UserRequestBodyBody } from '@/src/shared/api/_models'
import { createUser } from '@/src/shared/api/fetch'
import { setSessionToken } from '@/src/shared/api/store'
import { handleError } from '@/src/shared/lib/handleError'
import { logger } from '@/src/shared/lib/logger'
import { IBaseAction, IErrors } from '@/src/shared/model'

export async function register(prevState: IBaseAction, body: UserRequestBodyBody) {
  try {
    const response = (await createUser(body)) as NewUserResponseResponse & { errors?: IErrors }

    if (!response?.errors) {
      const response = (await login({
        email: body.email,
        password: body.password as string,
      })) as LoginResponse & { errors?: IErrors }

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
