import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createWorkoutValidator = vine.compile(
  vine.object({
    date: vine.date(),
  })
)

export type CreateWorkoutSchema = Infer<typeof createWorkoutValidator>
