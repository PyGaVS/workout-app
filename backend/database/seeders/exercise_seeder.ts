import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Muscle from '#commons/models/muscle'
import Exercise from '#commons/models/exercise'

export default class ExerciseSeeder extends BaseSeeder {
  public async run() {
    const exercises = [
      {
        name: 'Développé couché',
        normalized_name: 'developpe couche',
        type: 'polyarticulaire',
        muscles: ['Grand pectoral', 'Triceps brachial', 'Deltoïde antérieur'],
      },
      {
        name: 'Squat',
        normalized_name: 'squat',
        type: 'polyarticulaire',
        muscles: ['Droit fémoral', 'Grand fessier', 'Vaste latéral'],
      },
      {
        name: 'Soulevé de terre jambes tendues',
        normalized_name: 'souleve de terre jambes tendues',
        type: 'polyarticulaire',
        muscles: ['Ischio-jambiers', 'Grand fessier', 'Erecteurs du rachis'],
      },
      {
        name: 'Rowing barre',
        normalized_name: 'rowing barre',
        type: 'polyarticulaire',
        muscles: ['Grand dorsal', 'Trapèze moyen', 'Biceps brachial'],
      },
      {
        name: 'Crunchs',
        normalized_name: 'crunchs',
        type: 'poids du corps',
        muscles: ['Grand droit de l’abdomen', 'Obliques externes'],
      },
      {
        name: 'Curl biceps',
        normalized_name: 'curl biceps',
        type: 'isolation',
        muscles: ['Biceps brachial'],
      },
      {
        name: 'Mollets debout',
        normalized_name: 'mollets debout',
        type: 'isolation',
        muscles: ['Gastrocnemien'],
      },
      {
        name: 'Burpees',
        normalized_name: 'burpees',
        type: 'cardio',
        muscles: ['Grand fessier', 'Quadriceps', 'Deltoïde moyen'],
      },
      {
        name: 'Développé militaire',
        normalized_name: 'developpe militaire',
        type: 'polyarticulaire',
        muscles: ['Deltoïde antérieur', 'Triceps brachial'],
      },
      {
        name: 'Tirage vertical',
        normalized_name: 'tirage vertical',
        type: 'musculation',
        muscles: ['Grand dorsal', 'Biceps brachial'],
      },
      {
        name: 'Fentes',
        normalized_name: 'fentes',
        type: 'polyarticulaire',
        muscles: ['Quadriceps', 'Grand fessier'],
      },
      {
        name: 'Planche latérale',
        normalized_name: 'planche laterale',
        type: 'poids du corps',
        muscles: ['Obliques externes', 'Transverse de l’abdomen'],
      },
      {
        name: 'Extension triceps à la poulie',
        normalized_name: 'extension triceps a la poulie',
        type: 'isolation',
        muscles: ['Triceps brachial'],
      },
      {
        name: 'Élévations latérales',
        normalized_name: 'elevations laterales',
        type: 'isolation',
        muscles: ['Deltoïde moyen'],
      },
      {
        name: 'Hip thrust',
        normalized_name: 'hip thrust',
        type: 'musculation',
        muscles: ['Grand fessier'],
      },
      {
        name: 'Mountain climbers',
        normalized_name: 'mountain climbers',
        type: 'cardio',
        muscles: ['Grand droit de l’abdomen', 'Quadriceps'],
      },
      {
        name: 'Jumping jacks',
        normalized_name: 'jumping jacks',
        type: 'cardio',
        muscles: ['Deltoïde moyen', 'Quadriceps'],
      },
      {
        name: 'Étirements du dos',
        normalized_name: 'etirements du dos',
        type: 'mobilité',
        muscles: ['Erecteurs du rachis'],
      },
      {
        name: 'Étirements des ischios',
        normalized_name: 'etirements des ischios',
        type: 'mobilité',
        muscles: ['Ischio-jambiers'],
      },
      {
        name: 'Good mornings',
        normalized_name: 'good mornings',
        type: 'musculation',
        muscles: ['Erecteurs du rachis', 'Ischio-jambiers'],
      },
      {
        name: 'Tractions',
        normalized_name: 'tractions',
        type: 'poids du corps',
        muscles: ['Grand dorsal', 'Biceps brachial', 'Trapèze moyen'],
      },
      {
        name: 'Pompes',
        normalized_name: 'pompes',
        type: 'poids du corps',
        muscles: ['Grand pectoral', 'Triceps brachial', 'Deltoïde antérieur'],
      },
      {
        name: 'Dips',
        normalized_name: 'dips',
        type: 'poids du corps',
        muscles: ['Triceps brachial', 'Grand pectoral', 'Deltoïde antérieur'],
      },
      {
        name: 'Pull-over',
        normalized_name: 'pull over',
        type: 'musculation',
        muscles: ['Grand dorsal', 'Grand pectoral'],
      },
      {
        name: 'Planche',
        normalized_name: 'planche',
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
        normalized_name: exercise.normalized_name,
      })

      await createdExercise.related('muscles').attach(muscleIds)
    }
  }
}
