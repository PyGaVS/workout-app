import { HttpContext } from '@adonisjs/core/http'
import { createSetValidator, updateSetValidator } from '#domains/set/validators/set_validator'
import SetService from '#domains/set/services/set_service'
import { inject } from '@adonisjs/core'
import SetPolicy from '#domains/set/policies/set_policy'
import OwnerResolver from '#commons/utils/owner_resolver'
import Set from '#commons/models/set'

@inject()
export default class SetsController {
  constructor(
    protected setService: SetService,
    protected ownerResolver: OwnerResolver
  ) {}

  async store({ request, response, params, bouncer }: HttpContext) {
    const { exerciseBlocId, exerciseId } = params
    await bouncer.with(SetPolicy).authorize('view')
    const payload = await request.validateUsing(createSetValidator)
    const set = await this.setService.create(payload, exerciseBlocId, exerciseId)

    return response.created(set)
  }

  async update({ }: HttpContext) {
    /*
    const setToUpdate = await Set.findOrFail(params.setId)
    await bouncer.with(SetPolicy).authorize('edit', setToUpdate)
    const payload = await request.validateUsing(updateSetValidator)
    const set = await this.setService.updateById(params.setId, payload)

    return response.ok(set)
    */
  }
}
