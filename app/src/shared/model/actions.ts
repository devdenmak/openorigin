/* eslint-disable @typescript-eslint/no-explicit-any */

export type IErrors = Array<{
  message?: string
  data?: {
    errors?: Array<{
      path?: string
      message?: string
    }>
  }
}> | null

export type IBaseAction = { isError: boolean; isSuccess: boolean; data: any; errors: IErrors }
