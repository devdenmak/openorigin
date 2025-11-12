import { Avatar, User } from '@/src/shared/api/_models'
import { IErrors } from '@/src/shared/model'

export type CurrentUser = {
  id: string
  email: string
  username: string
  aiInterests?: string
  avatar: Avatar
  collection: 'users'
  githubUsername?: string
  createdAt: string
  updatedAt: string
  name: string
  _strategy: string
  _verified: boolean
}

export type CurrentUserResponse = {
  user: CurrentUser | null
  collection?: string
  token?: string
  exp?: number
  message?: string
}

export type LoginBody = {
  email: string
  password: string
}

export type PasswordForgotBody = {
  email: string
}

export type PasswordForgotResponse = {
  message: string
}

export type PasswordResetBody = {
  token: string
  password: string
}

export type PasswordResetResponse = {
  message: string
  token: string
  user: CurrentUser
}

export type LoginResponse = {
  message: string
  exr: number
  token: string
  user: User
  error?: IErrors
}

export type RefreshTokenResponse = {
  exp: number
  message: string
  refreshedToken: string
  setCookie: boolean
  strategy: string
  user: CurrentUser
}
