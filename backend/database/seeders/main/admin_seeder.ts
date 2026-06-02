import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash'
import { defaultAdminPermissions } from '#commons/permissions/permissions_enum'
import { computeBitfield } from '#commons/utils/compute_bitfield'

/**
 * Seeder dédié à la création d'un admin via variables d'environnement.
 * Lancé automatiquement par docker-entrypoint.sh au démarrage du backend.
 *
 * Variables attendues (sinon skip silencieux) :
 *   - ADMIN_EMAIL     (requis)
 *   - ADMIN_PASSWORD  (requis)
 *   - ADMIN_NAME      (optionnel, défaut: "Admin")
 *
 * Idempotent : si un user avec le même email existe déjà, ne fait rien.
 */
export default class AdminSeeder extends BaseSeeder {
  async run() {
    const email = process.env.ADMIN_EMAIL
    const password = process.env.ADMIN_PASSWORD
    const fullName = process.env.ADMIN_NAME ?? 'Admin'

    if (!email || !password) {
      console.log('⚠ ADMIN_EMAIL / ADMIN_PASSWORD non définis — skip admin seeder.')
      return
    }

    const existing = await db.from('users').where('email', email).first()
    if (existing) {
      console.log(`▶ Admin "${email}" existe déjà — skip.`)
      return
    }

    await db
      .insertQuery()
      .table('users')
      .insert({
        full_name: fullName,
        email,
        password: await hash.make(password),
        permissions: computeBitfield(defaultAdminPermissions),
        created_at: new Date(),
        updated_at: new Date(),
      })

    console.log(`✔ Admin "${email}" créé.`)
  }
}
