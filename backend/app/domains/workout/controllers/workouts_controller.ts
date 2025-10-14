// import type { HttpContext } from '@adonisjs/core/http'

import type { HttpContext } from '@adonisjs/core/http'
import WorkoutService from '#domains/workout/services/workouts_services'
import { inject } from '@adonisjs/core'

@inject()
export default class WorkoutsController {
  constructor(protected workoutService: WorkoutService) {}

  index({ auth }: HttpContext) {
    return this.workoutService.getWorkouts(auth.user!.id)
  }
}
