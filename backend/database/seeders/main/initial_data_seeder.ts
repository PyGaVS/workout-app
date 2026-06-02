import { BaseSeeder } from '@adonisjs/lucid/seeders'
import MuscleSeeder from '#database/seeders/muscle_seeder'
import ExerciseSeeder from '#database/seeders/exercise_seeder'

/**
 * Données initiales nécessaires au fonctionnement de l'app en prod :
 * la liste des muscles et la liste des exercices.
 *
 * Lancé par docker-entrypoint.sh à chaque démarrage du backend.
 * Idempotent grâce aux checks dans muscle_seeder et exercise_seeder.
 */
export default class InitialDataSeeder extends BaseSeeder {
  async run() {
    console.log('▶ Seeding muscles...')
    await new MuscleSeeder(this.client).run()

    console.log('▶ Seeding exercises...')
    await new ExerciseSeeder(this.client).run()
  }
}
