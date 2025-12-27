import type { HttpContext } from '@adonisjs/core/http'
import WorkoutService from '#domains/workout/services/workout_service'
import { inject } from '@adonisjs/core'
import {
  createWorkoutValidator,
  updateWorkoutValidator,
} from '#domains/workout/validators/workouts_validator'
import WorkoutPolicy from '#domains/workout/policies/workout_policy'
import Workout from '#commons/models/workout'

@inject()
export default class WorkoutsController {
  constructor(protected workoutService: WorkoutService) {}

  async index({ auth, bouncer }: HttpContext) {
    console.log('Indexing workouts')
    await bouncer.with(WorkoutPolicy).authorize('browse')
    return this.workoutService.getWorkouts(auth.user!.id)
  }

  async update({ bouncer, request }: HttpContext) {
    const workout = await Workout.findOrFail(request.param('id'))
    await bouncer.with(WorkoutPolicy).authorize('edit', workout)

    const data = await request.validateUsing(updateWorkoutValidator)
    return this.workoutService.update(data, workout)
  }

  async store({ auth, request, bouncer }: HttpContext) {
    const userId = auth.user!.id

    await bouncer.with(WorkoutPolicy).authorize('create')

    const data = await request.validateUsing(createWorkoutValidator)
    return this.workoutService.create(data, userId)
  }

  async destroy({ auth, bouncer, request, response }: HttpContext) {
    await auth.authenticate()
    const workout = await Workout.findOrFail(request.param('id'))
    await bouncer.with(WorkoutPolicy).authorize('delete', workout)

    const deleted = await this.workoutService.delete(workout)

    return deleted 
      ? response.status(200).json({ message: 'Workout deleted successfully' })
      : response.status(500).json({ message: 'Failed to delete workout' })
  }
}
