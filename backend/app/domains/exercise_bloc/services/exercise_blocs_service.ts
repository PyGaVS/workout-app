import { CreateExerciseBlocSchema } from '#domains/exercise_bloc/validators/exercise_blocs_validators'
import ExerciseBloc from '#commons/models/exercise_bloc'
import Workout from '#commons/models/workout'

export default class ExerciseBlocService {
  async create({ title }: CreateExerciseBlocSchema, workoutId: number) {
    await ExerciseBloc.create({
      title,
      workoutId,
    })

    return Workout.query()
      .where('id', workoutId)
      .preload('exerciseBlocs', (blocQuery) => {
        blocQuery.preload('sets', (setQuery) => {
          setQuery.preload('exercise', (exerciseQuery) => {
            exerciseQuery.preload('muscles')
          })
        })
      })
      .firstOrFail()
  }
}
