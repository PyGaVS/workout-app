import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { SetFactory } from '#database/factories/set_factory'

export default class extends BaseSeeder {
  async run() {
    await SetFactory.createMany(600)
  }
}
