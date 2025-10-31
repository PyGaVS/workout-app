import { HttpContext } from '@adonisjs/core/http'
import { createSetValidator, updateSetValidator } from '#domains/set/validators/set_validator'
import SetService from '#domains/set/services/set_service'
import { inject } from '@adonisjs/core'
import SetPolicy from '#domains/set/policies/set_policy'

@inject()
export default class SetsController {
  constructor(protected setService: SetService) {}

  async store({ request, response, params }: HttpContext) {
    const { exerciseBlocId, exerciseId } = params
    const payload = await request.validateUsing(createSetValidator)
    const set = await this.setService.create(payload, exerciseBlocId, exerciseId)

    return response.created(set)
  }

  async update({ request, response, params, bouncer }: HttpContext) {
    const { setId } = params
    const thisSet = await this.setService.findByIdWithRelations(setId)
    await bouncer.with(SetPolicy).authorize('edit', thisSet)
    const payload = await request.validateUsing(updateSetValidator)
    const set = await this.setService.updateById(setId, payload)

    return response.ok(set)
  }
}
