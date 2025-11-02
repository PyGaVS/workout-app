import { BasePolicy } from '@adonisjs/bouncer'
import { PermissionService } from '#commons/permissions/permission_service'
import User from '#commons/models/user'
import { Permissions } from '#commons/permissions/permissions_enum'
import Set from '#commons/models/set'
import OwnerResolver from '#commons/utils/owner_resolver'
import { inject } from '@adonisjs/core'

@inject()
export default class SetPolicy extends BasePolicy {
  constructor(
    protected permissionService: PermissionService,
    protected ownerResolver: OwnerResolver
  ) {
    super()
  }

  // If user is admin, he is authorized anyway
  async before(user: User) {
    if (await this.permissionService.hasPermission(user, Permissions.ADMIN)) {
      return true
    }
  }

  // User is authorized to browse sets (maybe to get inspiration)
  async browse() {
    return true
  }

  // User is authorized to create a set, but only link to one of his exercise_blocs
  async create(user: User) {
    return this.permissionService.hasPermission(user, Permissions.MANAGE_SET)
  }

  // User is authorized to see his own sets, maybe could see other ones sets as an example for him
  async view(user: User) {
    return this.permissionService.hasPermission(user, Permissions.VIEW_SET)
  }

  // User is authorized to edit his own sets, and only his own sets
  async edit(user: User, set: Set) {
    const owner = await this.ownerResolver.findOwner(set)
    if (owner === null) {
      return {
        authorized: false,
        message: 'Owner cant be found',
      }
    }
    if (owner.id !== user.id) {
      return {
        authorized: false,
        message: `You are not the owner of this set`,
      }
    }
    if (await this.permissionService.hasPermission(user, Permissions.MANAGE_SET)) {
      return {
        authorized: true,
        message: 'You are authorized',
      }
    }
    return {
      authorized: true,
      message: 'You are not authorized to update this set',
    }
  }

  // User is authorized to delete his own sets and only his own sets
  async delete(user: User, set: Set) {
    if ((await this.ownerResolver.findOwner(set)) !== user) {
      return {
        authorized: false,
        message: `You are not the owner of this set`,
      }
    }
    return this.permissionService.hasPermission(user, Permissions.MANAGE_SET)
  }
}
