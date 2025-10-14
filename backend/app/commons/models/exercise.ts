import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Set from './set.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Muscle from './muscle.js'

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

  @hasMany(() => Set)
  declare sets: HasMany<typeof Set>

  @manyToMany(() => Muscle, {
    pivotTable: 'exercise_muscle',
  })
  declare muscles: ManyToMany<typeof Muscle>
}
