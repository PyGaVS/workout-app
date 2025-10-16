import { HttpContext } from '@adonisjs/core/http'
import { createExerciseBlocValidator } from '#domains/exercise_bloc/validators/exercise_blocs_validators'
import { inject } from '@adonisjs/core'
import ExerciseBlocService from '#domains/exercise_bloc/services/exercise_blocs_service'

@inject()
export default class ExerciseBlocsController {
  constructor(protected exerciseBlocService: ExerciseBlocService) {}

  async store({ params, request, response }: HttpContext) {
    const { workoutId } = params
    const data = await request.validateUsing(createExerciseBlocValidator)
    const exerciseBloc = await this.exerciseBlocService.create({ ...data }, workoutId)

    return response.created(exerciseBloc)
  }
}
