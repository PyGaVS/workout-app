import factory from '@adonisjs/lucid/factories'
import ExerciseBloc from '../../app/commons/models/exercise_bloc'
import Workout from '../../app/commons/models/workout'

export const ExerciseBlocFactory = factory
  .define(ExerciseBloc, async ({ faker }) => {
    const [workout] = await Promise.all([
      Workout.query().select('id').orderByRaw('RANDOM()').first(),
    ])

    return {
      title: faker.string.uuid(),
      workoutId: workout?.id,
    }
  })
  .build()
