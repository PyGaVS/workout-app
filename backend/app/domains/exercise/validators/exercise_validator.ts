import vine from '@vinejs/vine'
import { searchComposable } from '#commons/validators/searchable'
import { Infer } from '@vinejs/vine/types'

export const searchExerciseValidator = vine.compile(vine.object(searchComposable.getProperties()))

export const createExerciseValidator = vine.compile(
  vine.object({
    name: vine.string(),
  })
)

export type SearchExerciseSchema = Infer<typeof searchExerciseValidator>
