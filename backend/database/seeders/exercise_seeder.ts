import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Muscle from '#commons/models/muscle'
import Exercise from '#commons/models/exercise'

export default class ExerciseSeeder extends BaseSeeder {
  public async run() {
    const exercises = [
      // --- Haut du corps ---
      {
        name: 'Développé couché',
        type: 'polyarticulaire',
        muscles: ['Pectoraux', 'Triceps', 'Épaules'],
      },
      {
        name: 'Développé incliné avec haltères',
        type: 'polyarticulaire',
        muscles: ['Pectoraux', 'Épaules', 'Triceps'],
      },
      {
        name: 'Développé militaire',
        type: 'polyarticulaire',
        muscles: ['Épaules', 'Triceps'],
      },
      {
        name: 'Élévations latérales',
        type: 'isolation',
        muscles: ['Épaules'],
      },
      {
        name: 'Rowing barre',
        type: 'polyarticulaire',
        muscles: ['Dos', 'Biceps', 'Trapèzes'],
      },
      {
        name: 'Tirage horizontal à la machine',
        type: 'machine',
        muscles: ['Dos', 'Biceps'],
      },
      {
        name: 'Tirage vertical à la poulie',
        type: 'machine',
        muscles: ['Dos', 'Biceps'],
      },
      {
        name: 'Curl biceps avec barre',
        type: 'isolation',
        muscles: ['Biceps'],
      },
      {
        name: 'Extension triceps à la poulie',
        type: 'isolation',
        muscles: ['Triceps'],
      },

      // --- Tronc ---
      {
        name: 'Crunchs',
        type: 'poids du corps',
        muscles: ['Abdominaux'],
      },
      {
        name: 'Gainage planche',
        type: 'poids du corps',
        muscles: ['Abdominaux', 'Dos'],
      },
      {
        name: 'Planche latérale',
        type: 'poids du corps',
        muscles: ['Obliques'],
      },

      // --- Bas du corps ---
      {
        name: 'Squat',
        type: 'polyarticulaire',
        muscles: ['Quadriceps', 'Fessiers', 'Ischio-jambiers'],
      },
      {
        name: 'Fentes avant',
        type: 'polyarticulaire',
        muscles: ['Quadriceps', 'Fessiers'],
      },
      {
        name: 'Presse à cuisses',
        type: 'machine',
        muscles: ['Quadriceps', 'Fessiers'],
      },
      {
        name: 'Soulevé de terre',
        type: 'polyarticulaire',
        muscles: ['Dos', 'Ischio-jambiers', 'Fessiers'],
      },
      {
        name: 'Hip thrust',
        type: 'polyarticulaire',
        muscles: ['Fessiers', 'Ischio-jambiers'],
      },
      {
        name: 'Mollets debout',
        type: 'isolation',
        muscles: ['Mollets'],
      },
      {
        name: 'Mollets à la presse',
        type: 'machine',
        muscles: ['Mollets'],
      },
      {
        name: 'Tractions',
        type: 'poids du corps',
        muscles: ['Grand dorsal', 'Biceps brachial', 'Trapèze moyen'],
      },
      {
        name: 'Pompes',
        type: 'poids du corps',
        muscles: ['Grand pectoral', 'Triceps brachial', 'Deltoïde antérieur'],
      },
      {
        name: 'Dips',
        type: 'poids du corps',
        muscles: ['Triceps brachial', 'Grand pectoral', 'Deltoïde antérieur'],
      },
      {
        name: 'Pull-over',
        type: 'musculation',
        muscles: ['Grand dorsal', 'Grand pectoral'],
      },
      {
        name: 'Planche',
        type: 'poids du corps',
        muscles: ['Grand droit de l’abdomen', 'Transverse de l’abdomen', 'Obliques'],
      },
    ]

    for (const exercise of exercises) {
      const muscleIds: number[] = []

      for (const muscleName of exercise.muscles) {
        const muscle = await Muscle.findBy('name', muscleName)
        if (muscle) {
          muscleIds.push(muscle.id)
        }
      }

      const createdExercise = await Exercise.create({
        name: exercise.name,
        type: exercise.type,
      })

      await createdExercise.related('muscles').attach(muscleIds)
    }
  }
}
