import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import ExerciseBloc from '#models/exercise_bloc'

export default class Workout extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare date: Date

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => ExerciseBloc)
  declare exerciseBlocs: HasMany<typeof ExerciseBloc>
}
