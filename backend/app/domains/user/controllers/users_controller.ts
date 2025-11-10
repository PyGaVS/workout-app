import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import UserService from '#domains/user/services/user_service'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}

  async show({ params }: HttpContext) {
    return await this.userService.findById(params.userId)
  }
}
