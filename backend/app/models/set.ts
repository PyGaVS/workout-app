import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import ExerciseBloc from '#models/exercise_bloc'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Exercise from '#models/exercise'

export default class Set extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare reps: number

  @column()
  declare weight: number

  @column()
  declare comment: string

  @column()
  declare restTime: number //Time in seconds

  @column()
  declare tempo: string

  @column()
  declare exerciseId: number

  @column()
  declare exerciseBlocId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations

  @belongsTo(() => ExerciseBloc)
  declare exerciseBloc: BelongsTo<typeof ExerciseBloc>

  @belongsTo(() => Exercise)
  declare exercise: BelongsTo<typeof Exercise>
}
