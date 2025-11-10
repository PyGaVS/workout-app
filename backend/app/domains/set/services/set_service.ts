import { CreateSetSchema, UpdateSetSchema } from '#domains/set/validators/set_validator'
import { default as ExerciseSet } from '#commons/models/set'

export default class SetService {
  async create({ ...payload }: CreateSetSchema, exerciseBlocId: number, exerciseId: number) {
    return ExerciseSet.create({
      ...payload,
      exerciseBlocId,
      exerciseId,
    })
  }

  async updateById(setId: string | number, payload: UpdateSetSchema) {
    const set = await ExerciseSet.findOrFail(setId)
    await set.merge({ ...payload }).save()

    return set
  }

  async findByIdWithRelations(setId: string | number) {
    return ExerciseSet.query()
      .where('id', setId)
      .preload('exerciseBloc', (blocQuery) => {
        blocQuery.preload('workout', (workoutQuery) => {
          workoutQuery.preload('user')
        })
      })
      .firstOrFail()
  }
}
