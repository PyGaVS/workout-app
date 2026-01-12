import { SearchExerciseSchema } from '#domains/exercise/validators/exercise_validator'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import Exercise from '#commons/models/exercise'

export default class ExerciseService {
  async paginate(payload: SearchExerciseSchema): Promise<ModelPaginatorContract<Exercise>> {
    const rawSearch = (payload.search ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .split(/\s+/)
      .join(' ')
      .trim()

    return Exercise.query()
      .withScopes((scopes) => scopes.search(rawSearch))
      .orderBy('name')
      .paginate(payload.page ?? 1, payload.limit ?? 25)
  }
}
