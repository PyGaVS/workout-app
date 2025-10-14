import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Workout from './workout.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Set from './set.js'

export default class ExerciseBloc extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare workoutId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations

  @belongsTo(() => Workout)
  declare workout: BelongsTo<typeof Workout>

  @hasMany(() => Set)
  declare sets: HasMany<typeof Set>
}
