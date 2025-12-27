import { HttpContext } from '@adonisjs/core/http'
import { StatsService } from '#domains/stats/services/stats_service'
import { inject } from '@adonisjs/core'

@inject()
export default class StatsController {
  constructor(protected statsService: StatsService) {}

  async index({ auth }: HttpContext) {
    const totalWorkouts = await this.statsService.workouts(auth.user!.id)
    const workoutsByMonths = await this.statsService.workoutsByMonths(auth.user!.id)
    const mostUsedMuscle = await this.statsService.mostUsedMuscles(auth.user!.id)
    const favouriteExercise = await this.statsService.favouriteExercise(auth.user!.id)
    const topExercise = await this.statsService.topExercises(auth.user!.id)
    const weeklyMusclesUsage = await this.statsService.musclesUsageAverage(auth.user!.id)
    const lastWorkoutData = await this.statsService.lastWorkoutData(auth.user!.id)

    return {
      lastWorkoutData,
      totalWorkouts,
      workoutsByMonths,
      mostUsedMuscle,
      favouriteExercise,
      topExercise,
      weeklyMusclesUsage,
    }
  }

  async thisWeek({ auth }: HttpContext) {
    const thisWeek = await this.statsService.thisWeekWorkouts(auth.user!.id)

    return {
      thisWeek,
    }
  }
}
