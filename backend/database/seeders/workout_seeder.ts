import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { WorkoutFactory } from '#database/factories/workout_factory'

export default class extends BaseSeeder {
  async run() {
    await WorkoutFactory.createMany(5)
  }
}
