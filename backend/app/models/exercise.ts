import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Set from '#models/set'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Muscle from '#models/muscle'

export default class Exercise extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare type: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations

  @belongsTo(() => Set)
  declare set: BelongsTo<typeof Set>

  @hasMany(() => Muscle)
  declare muscles: HasMany<typeof Muscle>
}
