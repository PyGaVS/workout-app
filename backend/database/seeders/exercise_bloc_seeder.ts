import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { ExerciseBlocFactory } from '#database/factories/exercise_bloc_factory'

export default class extends BaseSeeder {
  async run() {
    await ExerciseBlocFactory.createMany(30)
  }
}
