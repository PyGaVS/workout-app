import vine from '@vinejs/vine'
import { unique } from '#commons/validators/unique'
import { Infer } from '@vinejs/vine/types'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(3),
    email: vine.string().email().unique(unique('users', 'email')),
    password: vine.string().trim().minLength(3),
    permissions: vine.number().optional(),
  })
)

export type StoreUserSchema = Infer<typeof createUserValidator>
