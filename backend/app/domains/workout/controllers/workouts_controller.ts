import type { HttpContext } from '@adonisjs/core/http'
import WorkoutService from '#domains/workout/services/workouts_service'
import { inject } from '@adonisjs/core'
import { createWorkoutValidator } from '#domains/workout/validators/workouts_validator'
import WorkoutPolicy from '#domains/workout/policies/workout_policy'

@inject()
export default class WorkoutsController {
  constructor(protected workoutService: WorkoutService) {}

  async index({ auth, bouncer }: HttpContext) {
    await bouncer.with(WorkoutPolicy).authorize('browse')
    return this.workoutService.getWorkouts(auth.user!.id)
  }

  async store({ auth, request, response, bouncer }: HttpContext) {
    const userId = auth.user!.id
    await bouncer.with(WorkoutPolicy).authorize('create')
    const data = await request.validateUsing(createWorkoutValidator)
    const workout = await this.workoutService.create({ ...data }, userId)

    return response.created(workout)
  }
}
