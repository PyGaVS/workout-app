import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { SetFactory } from '#database/factories/set_factory'
import { randomInt } from 'node:crypto'

export default class extends BaseSeeder {
  async run() {
    await SetFactory.createMany(randomInt(1, 5))
  }
}
