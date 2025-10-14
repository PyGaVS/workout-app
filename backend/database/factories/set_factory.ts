import factory from '@adonisjs/lucid/factories'
import Set from '#commons/models/set'
import ExerciseBloc from '#commons/models/exercise_bloc'
import Exercise from '#commons/models/exercise'
import { randomInt } from 'node:crypto'

export const SetFactory = factory
  .define(Set, async ({ faker }) => {
    const [exercise, exerciseBloc] = await Promise.all([
      Exercise.query().select('id').orderByRaw('RANDOM()').first(),
      ExerciseBloc.query().select('id').orderByRaw('RANDOM()').first(),
    ])
    return {
      reps: randomInt(1, 10),
      weight: randomInt(1, 200),
      comment: faker.string.sample({ min: 10, max: 30 }),
      restTime: randomInt(10, 120),
      tempo: faker.string.alpha(),
      exerciseId: exercise?.id,
      exerciseBlocId: exerciseBloc?.id,
    }
  })
  .build()
