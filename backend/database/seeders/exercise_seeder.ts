import {BaseSeeder} from '@adonisjs/lucid/seeders'
import Muscle from '#models/muscle'
import Exercise from '#models/exercise'

export default class ExerciseSeeder extends BaseSeeder {
  public async run() {
    const exercises = [
      {
        name: 'Développé couché',
        type: 'polyarticulaire',
        muscles: ['Grand pectoral', 'Triceps brachial', 'Deltoïde antérieur'],
      },
      {
        name: 'Squat',
        type: 'polyarticulaire',
        muscles: ['Droit fémoral', 'Grand fessier', 'Vaste latéral'],
      },
      {
        name: 'Soulevé de terre jambes tendues',
        type: 'polyarticulaire',
        muscles: ['Ischio-jambiers', 'Grand fessier', 'Érecteurs du rachis'],
      },
      {
        name: 'Rowing barre',
        type: 'polyarticulaire',
        muscles: ['Grand dorsal', 'Trapèze moyen', 'Biceps brachial'],
      },
      {
        name: 'Crunchs',
        type: 'poids du corps',
        muscles: ['Grand droit de l’abdomen', 'Obliques externes'],
      },
      {
        name: 'Curl biceps',
        type: 'isolation',
        muscles: ['Biceps brachial'],
      },
      {
        name: 'Mollets debout',
        type: 'isolation',
        muscles: ['Gastrocnémien'],
      },
      {
        name: 'Burpees',
        type: 'cardio',
        muscles: ['Grand fessier', 'Quadriceps', 'Deltoïde moyen'],
      },
      {
        name: 'Développé militaire',
        type: 'polyarticulaire',
        muscles: ['Deltoïde antérieur', 'Triceps brachial'],
      },
      {
        name: 'Tirage vertical',
        type: 'musculation',
        muscles: ['Grand dorsal', 'Biceps brachial'],
      },
      {
        name: 'Fentes',
        type: 'polyarticulaire',
        muscles: ['Quadriceps', 'Grand fessier'],
      },
      {
        name: 'Planche latérale',
        type: 'poids du corps',
        muscles: ['Obliques externes', 'Transverse de l’abdomen'],
      },
      {
        name: 'Extension triceps à la poulie',
        type: 'isolation',
        muscles: ['Triceps brachial'],
      },
      {
        name: 'Élévations latérales',
        type: 'isolation',
        muscles: ['Deltoïde moyen'],
      },
      {
        name: 'Hip thrust',
        type: 'musculation',
        muscles: ['Grand fessier'],
      },
      {
        name: 'Mountain climbers',
        type: 'cardio',
        muscles: ['Grand droit de l’abdomen', 'Quadriceps'],
      },
      {
        name: 'Jumping jacks',
        type: 'cardio',
        muscles: ['Deltoïde moyen', 'Quadriceps'],
      },
      {
        name: 'Étirements du dos',
        type: 'mobilité',
        muscles: ['Érecteurs du rachis'],
      },
      {
        name: 'Étirements des ischios',
        type: 'mobilité',
        muscles: ['Ischio-jambiers'],
      },
      {
        name: 'Good mornings',
        type: 'musculation',
        muscles: ['Érecteurs du rachis', 'Ischio-jambiers'],
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
