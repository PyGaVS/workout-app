import { BaseCommand } from '@adonisjs/core/ace'
import { execa } from 'execa'

export default class DbRefresh extends BaseCommand {
  static commandName = 'db:refresh'
  static description = 'Rollback and migrate database the execute database seeders.'

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  async run() {
    try {
      this.logger.info('Running migrations...')
      await execa('node', ['ace', 'migration:refresh'], { stdio: 'inherit' })

      this.logger.info('Running seeders...')
      await execa('node', ['ace', 'db:seed'], { stdio: 'inherit' })

      this.logger.success('Database refreshed successfully.')
    } catch (error: any) {
      this.logger.error('Error while refreshing database:')
      this.logger.error(error.stderr ?? error.message ?? String(error))
      this.exitCode = 1
    }
  }
}
