import { mutate } from 'swr'

import { getModelsFavoritesKey, getModelsMyKey } from '@/src/entities/auth-model/api/swr'
import { MODELS_TAG } from '@/src/entities/model/config'
import {
  ModelRequestBodyBody,
  ModelResponseResponse,
  NewImageResponseResponse,
} from '@/src/shared/api/_models'
import { createImage, updateModel } from '@/src/shared/api/fetch'
import { nextRevalidateTag, nextRevalidateTagByUrl } from '@/src/shared/api/revalidate'
import { getUpdateModelMutationKey } from '@/src/shared/api/swr'
import { handleError } from '@/src/shared/lib/handleError'
import { logger } from '@/src/shared/lib/logger'
import { IBaseAction, IErrors } from '@/src/shared/model'
import { IFile } from '@/src/shared/ui/FileUploader/FileUploader'

export async function editModel(
  prevState: IBaseAction,
  body: ModelRequestBodyBody & { id: string; images?: IFile[] },
) {
  try {
    const uploadedImageIds: number[] = []

    if (body.images && body.images.length > 0) {
      const existingImages = (body.images as IFile[]).filter((img) => !img.file && img.id)
      const newImages = (body.images as IFile[]).filter((img) => img.file)

      uploadedImageIds.push(...existingImages.map((img) => Number(img.id)))

      if (newImages.length > 0) {
        const uploadPromises = newImages.map(async (image) => {
          const formData = new FormData()

          formData.append('file', image.file!)
          formData.append(
            '_payload',
            JSON.stringify({
              alt: image.filename || image.file!.name || 'Model Image',
            }),
          )

          // @ts-expect-error - response type mismatch
          const uploadResponse = (await createImage(formData)) as NewImageResponseResponse & {
            errors?: IErrors
          }

          if (uploadResponse?.errors) {
            throw new Error(uploadResponse.errors[0]?.message || 'Failed to upload image')
          }

          return Number(uploadResponse.doc.id)
        })

        try {
          const newImageIds = await Promise.all(uploadPromises)

          uploadedImageIds.push(...newImageIds)
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
    const response = (await updateModel(body.id, requestBody)) as unknown as {
      doc: ModelResponseResponse
      errors?: IErrors
    }

    if (!response?.errors) {
      const modelKey = getUpdateModelMutationKey(response.doc.id)
      const authUserModelsKey = getModelsMyKey()
      const authUserFavoriteKey = getModelsFavoritesKey()

      nextRevalidateTag(MODELS_TAG) // Server revalidate public list models
      nextRevalidateTagByUrl(modelKey[0]) // Server revalidate ONE public model

      mutate(modelKey, response.doc) // SWR revalidate ONE puplic model
      mutate(authUserModelsKey) // SWR revalidate user list models
      mutate(authUserFavoriteKey) // SWR revalidate user favorite models

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
