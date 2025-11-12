import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { notFound } from 'next/navigation'
import { stringify } from 'qs'

import { BACKEND_URL } from '@/src/app/config/env'
import { deleteEmptyKeys } from '@/src/shared/lib/deleteEmptyKeys'
import { handleError } from '@/src/shared/lib/handleError'
import { logger } from '@/src/shared/lib/logger'

import { getSessionToken } from './store'

type IApiClientMainOptions = {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  params?: Record<string, unknown>
  data?: unknown
  headers?: Record<string, string>
  responseType?: string
}

type IApiClientAdditionalOptions = {
  fetchConfig?: NextFetchRequestConfig
  nextCookies?: () => ReadonlyRequestCookies
}

async function handleResponse<T>(response: Response, url: string): Promise<T> {
  if (!response.ok) logger.error(handleError(`HTTP error! Status: ${response.status}`), url)

  if (response.status === 404) notFound() // TODO: Think about it

  try {
    return {
      status: response.status,
      ...(await response?.json()),
    }
  } catch (error) {
    logger.error(handleError(error), url)

    throw new Error('Error parsing JSON response')
  }
}

const getHeaders = (cookies?: () => ReadonlyRequestCookies) => {
  return {
    Accept: 'application/json',
    Authorization: `Bearer ${getSessionToken(cookies)}`,
  }
}

export const getFullUrl = (url: string, params?: Record<string, unknown>) => {
  const endpoint = new URL(url, BACKEND_URL)
  const query = params ? stringify(deleteEmptyKeys(params)) : null

  return query ? `${endpoint.toString()}?${query}` : endpoint.toString()
}

export const apiClient = async <T>(
  { url, method, params, data, headers }: IApiClientMainOptions,
  nextConfig?: IApiClientAdditionalOptions,
): Promise<T> => {
  const baseHeaders = getHeaders(nextConfig?.nextCookies)
  const fullUrl = getFullUrl(url, params)

  logger.info(fullUrl)

  const tags = nextConfig?.fetchConfig?.tags ?? []

  if (method === 'GET') {
    const response = await fetch(fullUrl, {
      method,
      headers: {
        ...baseHeaders,
        ...headers,
      },
      next: {
        revalidate: 10,
        tags: [fullUrl, ...tags],
      },
    })

    return handleResponse<T>(response, fullUrl)
  }

  const isFormData = data instanceof FormData

  const { 'Content-Type': contentTypeHeader, ...otherHeaders } = headers ?? {}

  const response = await fetch(fullUrl, {
    method,
    headers: {
      ...baseHeaders,
      ...otherHeaders,
      ...(isFormData ? {} : { 'Content-Type': contentTypeHeader }),
    },
    ...(data ? { body: isFormData ? data : JSON.stringify(data) } : {}),
  })

  return handleResponse<T>(response, fullUrl)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1]

export default apiClient
