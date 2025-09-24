import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  async run() {
    await db
      .insertQuery()
      .table('users')
      .insert({
        full_name: 'Alexandre Bourguignon',
        email: 'alex.brgn@workout.fr',
        password: await hash.make('12345678'),
        created_at: new Date(),
        updated_at: new Date(),
      })
    await db
      .insertQuery()
      .table('users')
      .insert({
        full_name: 'Lylian Ball',
        email: 'lyl.ball@workout.fr',
        password: await hash.make('12345678'),
        created_at: new Date(),
        updated_at: new Date(),
      })
  }
}
