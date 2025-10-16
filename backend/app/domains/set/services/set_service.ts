import { CreateSetSchema } from '#domains/set/validators/set_validator'
import { default as ExerciseSet } from '#commons/models/set'

export default class SetService {
  async create({ ...payload }: CreateSetSchema, exerciseBlocId: number, exerciseId: number) {
    return ExerciseSet.create({
      ...payload,
      exerciseBlocId,
      exerciseId,
    })
  }
}
