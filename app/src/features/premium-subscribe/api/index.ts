import {
  NewPremiumSubscriptionResponseResponse,
  PremiumSubscriptionRequestBodyBody,
} from '@/src/shared/api/_models'
import { createPremiumSubscription } from '@/src/shared/api/fetch'
import { handleError } from '@/src/shared/lib/handleError'
import { logger } from '@/src/shared/lib/logger'
import { IBaseAction, IErrors } from '@/src/shared/model'

export async function subscribePremium(_: IBaseAction, body: PremiumSubscriptionRequestBodyBody) {
  try {
    const response = (await createPremiumSubscription(
      body,
    )) as NewPremiumSubscriptionResponseResponse & { errors?: IErrors }

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
      errors: response?.errors,
    }
  } catch (e) {
    logger.error(handleError(e))

    return {
      isError: false,
      isSuccess: true,
      data: null,
      errors: null,
    }
  }
}
