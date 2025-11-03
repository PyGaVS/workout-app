import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import ExerciseService from '#domains/exercise/services/exercise_service'
import { searchExerciseValidator } from '#domains/exercise/validators/exercise_validator'
import ExercisePolicy from '#domains/exercise/policies/exercise_policy'

@inject()
export default class ExercisesController {
  constructor(protected exerciseService: ExerciseService) {}

  async index({ request, bouncer }: HttpContext) {
    await bouncer.with(ExercisePolicy).authorize('browse')
    const payload = await request.validateUsing(searchExerciseValidator)

    return this.exerciseService.paginate(payload)
  }
}
