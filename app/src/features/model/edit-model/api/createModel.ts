import { mutate } from 'swr'

import { getModelsMyKey } from '@/src/entities/auth-model/api/swr'
import { MODELS_TAG } from '@/src/entities/model/config'
import {
  ModelRequestBodyBody,
  NewImageResponseResponse,
  NewModelResponseResponse,
} from '@/src/shared/api/_models'
import { createImage, createModel as modelCreate } from '@/src/shared/api/fetch'
import { nextRevalidateTag } from '@/src/shared/api/revalidate'
import { getUpdateModelMutationKey } from '@/src/shared/api/swr'
import { handleError } from '@/src/shared/lib/handleError'
import { logger } from '@/src/shared/lib/logger'
import { IBaseAction, IErrors } from '@/src/shared/model'
import { IFile } from '@/src/shared/ui/FileUploader/FileUploader'

export async function createModel(
  prevState: IBaseAction,
  body: ModelRequestBodyBody & { images?: IFile[] },
) {
  try {
    const uploadedImageIds: number[] = []

    if (body.images && body.images.length > 0) {
      for (const image of body.images) {
        if (!image.file) {
          if (image.id) {
            uploadedImageIds.push(Number(image.id))
          }

          continue
        }

        try {
          const formData = new FormData()

          formData.append('file', image.file)
          formData.append(
            '_payload',
            JSON.stringify({
              alt: image.filename || image.file.name || 'Model Image',
            }),
          )

          // @ts-expect-error - response type mismatch
          const uploadResponse = (await createImage(formData)) as NewImageResponseResponse & {
            errors?: IErrors
          }

          if (uploadResponse?.errors) {
            return {
              isError: true,
              isSuccess: false,
              data: null,
              errors: uploadResponse.errors,
            }
          }

          uploadedImageIds.push(Number(uploadResponse.doc.id))
        } catch (uploadError) {
          logger.error(handleError(uploadError))

          return {
            isError: true,
            isSuccess: false,
            data: null,
            errors: [{ message: 'Failed to upload images' }],
          }
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { images, ...restBody } = body

    const requestBody = {
      ...restBody,
      tag: Number(body.tag),
      author: Number(body.author),
      images: uploadedImageIds,
    }

    // @ts-ignore
    const response = (await modelCreate(requestBody)) as NewModelResponseResponse & {
      errors?: IErrors
    }

    if (!response?.errors) {
      nextRevalidateTag(MODELS_TAG) // Server revalidate public list models

      mutate(getUpdateModelMutationKey(response.doc.id), response.doc) // SWR revalidate ONE puplic model
      mutate(getModelsMyKey()) // SWR revalidate user modelS

      return {
        isError: false,
        isSuccess: true,
        data: response.doc,
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
