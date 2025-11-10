import { BasePolicy } from '@adonisjs/bouncer'
import { PermissionService } from '#commons/permissions/permission_service'
import { inject } from '@adonisjs/core'
import User from '#commons/models/user'
import { Permissions } from '#commons/permissions/permissions_enum'

@inject()
export default class UserPolicy extends BasePolicy {
  constructor(protected permissionService: PermissionService) {
    super()
  }

  async before(user: User) {
    if (await this.permissionService.hasPermission(user, Permissions.ADMIN)) {
      return true
    }
  }

  async browse(user: User) {
    return this.permissionService.hasPermission(user, Permissions.MANAGE_USER)
  }

  async create(user: User) {
    return this.permissionService.hasPermission(user, Permissions.MANAGE_USER)
  }

  async view(user: User, targetUser: User) {
    const isSelf = user.id === targetUser.id
    const canView = this.permissionService.hasPermission(user, Permissions.VIEW_USER)

    return isSelf || canView
  }

  async edit(user: User, targetUser: User) {
    const isSelf = user.id === targetUser.id
    const canEdit = this.permissionService.hasPermission(user, Permissions.MANAGE_USER)

    return isSelf || canEdit
  }

  async delete(user: User, targetUser: User) {
    const isSelf = user.id === targetUser.id
    if (isSelf) return true

    // Eviter que les non-admins suppriment les admins
    const targetIsAdmin =
      typeof targetUser.permissions !== 'undefined' &&
      (targetUser.permissions & Permissions.ADMIN) === Permissions.ADMIN

    if (targetIsAdmin) return false

    return this.permissionService.hasPermission(user, Permissions.MANAGE_USER)
  }
}
