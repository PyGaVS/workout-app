import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import ExerciseBloc from '#models/exercise_bloc'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Exercise from '#models/exercise'

export default class Set extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare reps: bigint

  @column()
  declare weight: bigint

  @column()
  declare comment: string

  @column()
  declare restTime: bigint //Time in seconds

  @column()
  declare tempo: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations

  @belongsTo(() => ExerciseBloc)
  declare exerciseBloc: BelongsTo<typeof ExerciseBloc>

  @hasMany(() => Exercise)
  declare exercises: HasMany<typeof Exercise>
}
