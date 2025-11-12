import { passwordForgot, passwordReset } from '@/src/entities/auth-user/api/fetch'
import {
  PasswordForgotBody,
  PasswordForgotResponse,
  PasswordResetBody,
  PasswordResetResponse,
} from '@/src/entities/auth-user/api/types'
import { handleError } from '@/src/shared/lib/handleError'
import { logger } from '@/src/shared/lib/logger'
import { IBaseAction, IErrors } from '@/src/shared/model'

export async function forgotPassword(prevState: IBaseAction, body: PasswordForgotBody) {
  try {
    const response = (await passwordForgot(body)) as PasswordForgotResponse & { errors?: IErrors }

    if (!response?.errors) {
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
      errors: response.errors,
    }
  } catch (e) {
    logger.error(handleError(e))

    return prevState
  }
}

export async function resetPassword(prevState: IBaseAction, body: PasswordResetBody) {
  try {
    const response = (await passwordReset(body)) as PasswordResetResponse & { errors?: IErrors }

    if (!response?.errors) {
      return {
        isError: false,
        isSuccess: true,
        data: response,
        errors: null,
      }
    }

    logger.error(handleError(response))

    return {
      isError: true,
      isSuccess: false,
      data: response,
      errors: response.errors,
    }
  } catch (e) {
    logger.error(handleError(e))

    return prevState
  }
}
