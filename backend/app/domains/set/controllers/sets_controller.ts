import { HttpContext } from '@adonisjs/core/http'
import { createSetValidator } from '#domains/set/validators/set_validator'
import SetService from '#domains/set/services/set_service'
import { inject } from '@adonisjs/core'

@inject()
export default class SetsController {
  constructor(protected setService: SetService) {}

  async store({ request, response, params }: HttpContext) {
    const { exerciseBlocId, exerciseId } = params
    const payload = await request.validateUsing(createSetValidator)
    const set = await this.setService.create(payload, exerciseBlocId, exerciseId)

    return response.created(set)
  }
}
