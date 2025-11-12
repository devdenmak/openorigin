import {
  CurrentUserResponse,
  LoginBody,
  LoginResponse,
  PasswordForgotBody,
  PasswordForgotResponse,
  PasswordResetBody,
  PasswordResetResponse,
  RefreshTokenResponse,
} from '@/src/entities/auth-user/api/types'
import apiClient, { SecondParameter } from '@/src/shared/api/base'

/**
 * @summary CurrentUser
 */
export const currentUser = (options?: SecondParameter<typeof apiClient>) => {
  return apiClient<CurrentUserResponse>({ url: `/api/users/me`, method: 'GET' }, options)
}

/**
 * @summary Logout
 */
export const logout = (options?: SecondParameter<typeof apiClient>) => {
  return apiClient<void>({ url: `/api/users/logout`, method: 'POST' }, options)
}

/**
 * @summary Login
 */
export const login = (authLoginBody: LoginBody, options?: SecondParameter<typeof apiClient>) => {
  return apiClient<LoginResponse>(
    {
      url: `/api/users/login`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: authLoginBody,
    },
    options,
  )
}

/**
 * @summary Password Forgot
 */
export const passwordForgot = (
  passwordForgotBody: PasswordForgotBody,
  options?: SecondParameter<typeof apiClient>,
) => {
  return apiClient<PasswordForgotResponse>(
    {
      url: `/api/users/forgot-password`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: passwordForgotBody,
    },
    options,
  )
}

/**
 * @summary Password Reset
 */
export const passwordReset = (
  passwordResetBody: PasswordResetBody,
  options?: SecondParameter<typeof apiClient>,
) => {
  return apiClient<PasswordResetResponse>(
    {
      url: `/api/users/reset-password`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: passwordResetBody,
    },
    options,
  )
}

export const refreshToken = (options?: SecondParameter<typeof apiClient>) => {
  return apiClient<RefreshTokenResponse>(
    {
      url: `/api/users/refresh-token`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    options,
  )
}
