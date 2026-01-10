import type { HttpContext } from '@adonisjs/core/http'
import { AccessCodeService } from '../services/access_code_service.js'
import { inject } from '@adonisjs/core'
import AccessCodePolicy from '../policies/access_code_policy.js'

@inject()
export default class AccessCodesController {
  constructor(private accessCodeService: AccessCodeService) {}
  async index({ bouncer }: HttpContext) {
    console.log('Indexing access codes')
    await bouncer.with(AccessCodePolicy).authorize('admin')
    return this.accessCodeService.getAccessCodes()
  }
  
  async show({}: HttpContext) {}
  
  async store({ bouncer, request } : HttpContext) {
    await bouncer.with(AccessCodePolicy).authorize('admin')
    const { memberFirstName, memberLastName } = request.body()
    return this.accessCodeService.createAccessCode(memberFirstName, memberLastName)
  }
  
}