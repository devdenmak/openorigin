import { mutate } from 'swr'

import { getCurrentUserKey } from '@/src/entities/auth-user/api/swr'
import { UserPatchRequestBodyBody, UserResponseResponse } from '@/src/shared/api/_models'
import { updateUser } from '@/src/shared/api/fetch'
import { handleError } from '@/src/shared/lib/handleError'
import { logger } from '@/src/shared/lib/logger'
import { IBaseAction, IErrors } from '@/src/shared/model'

export async function updateProfileAccount(
  prevState: IBaseAction,
  body: UserPatchRequestBodyBody & { id: string },
) {
  try {
    const response = (await updateUser(body.id, body)) as unknown as {
      doc: UserResponseResponse
      errors?: IErrors
    }

    if (!response?.errors) {
      mutate(getCurrentUserKey(), { user: response.doc })

      return {
        isError: false,
        isSuccess: true,
        data: response.doc,
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
  } catch (e) {
    logger.error(handleError(e))

    return prevState
  }
}
