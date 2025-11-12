import { mutate } from 'swr'

import { getCurrentUserKey } from '@/src/entities/auth-user/api/swr'
import {
  NewAvatarResponseResponse,
  UserPatchRequestBodyBody,
  UserResponseResponse,
} from '@/src/shared/api/_models'
import { createAvatar, updateUser } from '@/src/shared/api/fetch'
import { handleError } from '@/src/shared/lib/handleError'
import { logger } from '@/src/shared/lib/logger'
import { IBaseAction, IErrors } from '@/src/shared/model'
import { IFile } from '@/src/shared/ui/FileUploader/FileUploader'

type UpdateProfileBody = UserPatchRequestBodyBody & {
  id: string
  avatar?: IFile | null
}

export async function updateProfile(prevState: IBaseAction, body: UpdateProfileBody) {
  try {
    let avatarId: string | undefined | number = body.avatar?.id

    if (body.avatar?.file) {
      try {
        const formData = new FormData()

        formData.append('file', body.avatar.file)
        formData.append(
          '_payload',
          JSON.stringify({
            alt: body.avatar.file.name || 'User Avatar',
          }),
        )

        // @ts-expect-error - response type mismatch
        const uploadResponse = (await createAvatar(formData)) as NewAvatarResponseResponse & {
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

        avatarId = uploadResponse.doc.id
      } catch (uploadError) {
        logger.error(handleError(uploadError))

        return prevState
      }
    }

    const { id, avatar, ...restBody } = body

    const updateBody: UserPatchRequestBodyBody = {
      ...restBody,
      // @ts-ignore - Payload CMS expects number for relationship field
      avatar: avatar === null ? null : avatarId && avatarId !== '' ? Number(avatarId) : undefined,
    }

    const response = (await updateUser(id, updateBody)) as unknown as {
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
      errors: response?.errors || null,
    }
  } catch (e) {
    logger.error(handleError(e))

    return prevState
  }
}
