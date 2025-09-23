import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

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
}
