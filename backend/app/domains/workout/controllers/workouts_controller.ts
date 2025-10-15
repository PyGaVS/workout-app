import type { HttpContext } from '@adonisjs/core/http'
import WorkoutService from '#domains/workout/services/workouts_service'
import { inject } from '@adonisjs/core'
import { createWorkoutValidator } from '#domains/workout/validators/workouts_validator'

@inject()
export default class WorkoutsController {
  constructor(protected workoutService: WorkoutService) {}

  index({ auth }: HttpContext) {
    return this.workoutService.getWorkouts(auth.user!.id)
  }

  async store({ auth, request, response }: HttpContext) {
    const userId = auth.user!.id
    const data = await request.validateUsing(createWorkoutValidator)
    const workout = await this.workoutService.create({ ...data }, userId)

    return response.created(workout)
  }
}
