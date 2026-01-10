import User from '#commons/models/user'
import { PermissionService } from '#commons/permissions/permission_service'
import { Permissions } from '#commons/permissions/permissions_enum'
import { BasePolicy } from '@adonisjs/bouncer'
import { inject } from '@adonisjs/core'

@inject()
export default class AccessCodePolicy extends BasePolicy {
  constructor(protected permissionService: PermissionService) {
    super()
  }

  // User must be admin
  async before(user: User) {
    if (await this.permissionService.hasPermission(user, Permissions.ADMIN)) {
      return true
    } else {
      return false
    }
  }

  async admin(user: User) {
    return super.admin(user)
  }

}