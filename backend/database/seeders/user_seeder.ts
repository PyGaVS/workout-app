import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash'
import {
  defaultAdminPermissions,
  defaultUserPermissions,
} from '#commons/permissions/permissions_enum'
import { computeBitfield } from '#commons/utils/compute_bitfield'

export default class extends BaseSeeder {
  async run() {
    await db
      .insertQuery()
      .table('users')
      .insert({
        full_name: 'Alexandre Bourguignon',
        email: 'alex.brgn@workout.fr',
        password: await hash.make('12345678'),
        permissions: computeBitfield(defaultUserPermissions),
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
        permissions: computeBitfield(defaultAdminPermissions),
        created_at: new Date(),
        updated_at: new Date(),
      })
  }
}
