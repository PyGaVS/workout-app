import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Exercise from './exercise.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Muscle extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations

  @manyToMany(() => Exercise, {
    pivotTable: 'exercise_muscle',
  })
  declare exercise: ManyToMany<typeof Exercise>
}
