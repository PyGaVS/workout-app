import Workout from '#commons/models/workout'
import { CreateWorkoutSchema } from '#domains/workout/validators/workouts_validator'

export default class WorkoutService {
  async getWorkouts(userId: number) {
    return Workout.query()
      .where('user_id', userId)
      .preload('exerciseBlocs', (blocQuery) => {
        blocQuery.preload('sets', (setQuery) => {
          setQuery.preload('exercise')
        })
      })
  }

  async create({ date }: CreateWorkoutSchema, userId: number) {
    return Workout.create({
      date,
      userId,
    })
  }

  async findByIdWithRelations(workoutId: string | number) {
    return await Workout.query().where('id', workoutId).preload('user').firstOrFail()
  }
}
