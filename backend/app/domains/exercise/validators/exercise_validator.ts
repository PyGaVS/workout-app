import vine from '@vinejs/vine'
import { searchComposable } from '#commons/validators/searchable'
import { Infer } from '@vinejs/vine/types'

export const searchExerciseValidator = vine.compile(vine.object(searchComposable.getProperties()))

export type SearchExerciseSchema = Infer<typeof searchExerciseValidator>
