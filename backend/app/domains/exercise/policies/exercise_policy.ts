import { BasePolicy } from '@adonisjs/bouncer'
import { PermissionService } from '#commons/permissions/permission_service'
import { inject } from '@adonisjs/core'
import User from '#commons/models/user'
import { Permissions } from '#commons/permissions/permissions_enum'

@inject()
export default class ExercisePolicy extends BasePolicy {
  constructor(protected permissionService: PermissionService) {
    super()
  }

  async browse() {
    return true
  }

  async view() {
    return true
  }

  async create(user: User) {
    return this.permissionService.hasPermission(user, Permissions.ADMIN)
  }

  async edit(user: User) {
    return this.permissionService.hasPermission(user, Permissions.ADMIN)
  }

  async delete(user: User) {
    return this.permissionService.hasPermission(user, Permissions.ADMIN)
  }
}
