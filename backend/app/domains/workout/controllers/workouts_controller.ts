import type { HttpContext } from '@adonisjs/core/http'
import WorkoutService from '#domains/workout/services/workout_service'
import { inject } from '@adonisjs/core'
import { createWorkoutValidator } from '#domains/workout/validators/workouts_validator'
import WorkoutPolicy from '#domains/workout/policies/workout_policy'
import Workout from "#commons/models/workout";

@inject()
export default class WorkoutsController {
  constructor(protected workoutService: WorkoutService) {}

  async index({ auth, bouncer }: HttpContext) {
    await bouncer.with(WorkoutPolicy).authorize('browse')
    return await this.workoutService.getWorkouts(auth.user!.id)
  }

  async store({ auth, request, response, bouncer }: HttpContext) {
    const userId = auth.user!.id
    await bouncer.with(WorkoutPolicy).authorize('create')

    const data = await request.validateUsing(createWorkoutValidator)

    // Création du workout
    const workout = await Workout.create({
      date: data.date,
      userId,
    })

    // Création des blocs et sets liés
    if (data.exercise_blocs) {
      for (const bloc of data.exercise_blocs) {
        const exerciseBloc = await workout.related('exerciseBlocs').create({
          title: bloc?.title,
        })
        if (bloc && bloc.sets) {
          for (const set of bloc.sets) {
            await exerciseBloc.related('sets').create({
              exerciseId: set?.exercise_id,
              reps: set?.reps,
              weight: set?.weight,
              comment: set?.comment,
              restTime: set?.restTime,
              tempo: set?.tempo,
            })
          }
        }
      }
    }

    await workout.load('exerciseBlocs', (blocQuery) => {
      blocQuery.preload('sets')
    })

    return response.created(workout)
  }
}
