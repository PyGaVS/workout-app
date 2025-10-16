import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createExerciseBlocValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(5).maxLength(30),
  })
)

export type CreateExerciseBlocSchema = Infer<typeof createExerciseBlocValidator>
