import { BasePolicy } from '@adonisjs/bouncer'
import { inject } from '@adonisjs/core'
import { PermissionService } from '#commons/permissions/permission_service'
import Workout from '#commons/models/workout'
import { Permissions } from '#commons/permissions/permissions_enum'
import User from '#commons/models/user'

@inject()
export default class WorkoutPolicy extends BasePolicy {
  constructor(protected permissionService: PermissionService) {
    super()
  }

  async browse() {
    return true
  }

  async create(user: User) {
    return this.permissionService.hasPermission(user, Permissions.CREATE_WORKOUT)
  }

  async view(user: User, workout: Workout) {
    return user.id === workout.userId
  }

  async edit(user: User, workout: Workout) {
    const isOwner = user.id === workout.userId
    const canEdit = await this.permissionService.hasPermission(user, Permissions.EDIT_WORKOUT)
    return isOwner || canEdit
  }

  async delete(user: User, workout: Workout) {
    const isOwner = user.id === workout.userId
    const canDelete = await this.permissionService.hasPermission(user, Permissions.DELETE_WORKOUT)
    return isOwner || canDelete
  }
}
