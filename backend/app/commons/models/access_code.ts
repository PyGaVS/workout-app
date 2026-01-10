import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class AccessCode extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: string

  @column()
  declare memberFirstName: string

  @column()
  declare memberLastName: string

  @column()
  declare userId: number | null
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => User)
  declare user: HasOne<typeof User>
}