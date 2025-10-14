import Workout from '#commons/models/workout'

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
}
