import { HttpContext } from '@adonisjs/core/http'
import {
  createExerciseBlocValidator,
  updateExerciseBlocValidator,
} from '#domains/exercise_bloc/validators/exercise_blocs_validators'
import { inject } from '@adonisjs/core'
import ExerciseBlocService from '#domains/exercise_bloc/services/exercise_bloc_service'
import ExerciseBlocPolicy from '#domains/exercise_bloc/policies/exercise_bloc_policy'
import ExerciseBloc from '#commons/models/exercise_bloc'

@inject()
export default class ExerciseBlocsController {
  constructor(protected exerciseBlocService: ExerciseBlocService) {}

  async show({ params, bouncer, response }: HttpContext) {
    const ebId = params.exerciseBlocId
    await bouncer.with(ExerciseBlocPolicy).authorize('view')
    const exerciseBloc = await this.exerciseBlocService.findByIdWithRelations(ebId)

    return response.ok(exerciseBloc)
  }

  async store({ params, request, response, bouncer }: HttpContext) {
    const { workoutId } = params
    await bouncer.with(ExerciseBlocPolicy).authorize('create')
    const payload = await request.validateUsing(createExerciseBlocValidator)
    const exerciseBloc = await this.exerciseBlocService.create({ ...payload }, workoutId)

    return response.created(exerciseBloc)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    const eb = await ExerciseBloc.findOrFail(params.ebId)
    await bouncer.with(ExerciseBlocPolicy).authorize('edit', eb)
    const payload = await request.validateUsing(updateExerciseBlocValidator)
    const exerciseBloc = await this.exerciseBlocService.update(params.ebId, payload)

    return response.ok(exerciseBloc)
  }
}
