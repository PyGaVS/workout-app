import { HttpContext } from '@adonisjs/core/http'
import { StatsService } from '#domains/stats/services/stats_service'
import { inject } from '@adonisjs/core'

@inject()
export default class StatsController {
  constructor(protected statsService: StatsService) {}

  async index({ auth }: HttpContext) {
    const avgReps = await this.statsService.index(auth.user!.id)
    const totalWorkouts = await this.statsService.workouts(auth.user!.id)
    const monthWorkouts = await this.statsService.thisMonthWorkouts(auth.user!.id)
    const mostUsedMuscle = await this.statsService.mostUsedMuscles(auth.user!.id)
    const favouriteExercise = await this.statsService.favouriteExercise(auth.user!.id)
    const topExercise = await this.statsService.topExercises(auth.user!.id)

    return {
      avgReps,
      totalWorkouts,
      monthWorkouts,
      mostUsedMuscle,
      favouriteExercise,
      topExercise,
    }
  }

  async thisWeek({ auth }: HttpContext) {
    const thisWeek = await this.statsService.thisWeekWorkouts(auth.user!.id)

    return {
      thisWeek,
    }
  }
}
