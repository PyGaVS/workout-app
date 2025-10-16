import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createSetValidator = vine.compile(
  vine.object({
    reps: vine.number(),
    weight: vine.number(),
    comment: vine.string(),
    restTime: vine.number(),
    tempo: vine.string().optional(),
  })
)

export type CreateSetSchema = Infer<typeof createSetValidator>
