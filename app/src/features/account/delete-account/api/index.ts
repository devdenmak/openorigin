import { mutate } from 'swr'

import { UserResponseResponse } from '@/src/shared/api/_models'
import { deleteUser } from '@/src/shared/api/fetch'
import { deleteSessionToken } from '@/src/shared/api/store'
import { handleError } from '@/src/shared/lib/handleError'
import { logger } from '@/src/shared/lib/logger'
import { IBaseAction, IErrors } from '@/src/shared/model'

export async function deleteAccount(prevState: IBaseAction, id: string): Promise<IBaseAction> {
  try {
    const response = (await deleteUser(id)) as unknown as {
      doc: UserResponseResponse
      errors: IErrors
    }

    if (response.errors) {
      return {
        isError: true,
        isSuccess: false,
        data: null,
        errors: response.errors,
      }
    }

    mutate(() => true, undefined, false)
    deleteSessionToken()

    return {
      isError: false,
      isSuccess: true,
      data: response.doc,
      errors: null,
    }
  } catch (e) {
    logger.error(handleError(e))

    return prevState
  }
}
