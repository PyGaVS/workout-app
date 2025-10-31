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

  // If user is admin, he is authorized anyway
  async before(user: User) {
    if (await this.permissionService.hasPermission(user, Permissions.ADMIN)) {
      return true
    }
  }

  // User is able to browse workouts (maybe to get inspiration)
  async browse(user: User) {
    return this.permissionService.hasPermission(user, Permissions.VIEW_WORKOUT)
  }

  // User is able to create a workout
  async create(user: User) {
    return this.permissionService.hasPermission(user, Permissions.MANAGE_WORKOUT)
  }

  // User is able to see his own workouts
  async view(user: User, workout: Workout) {
    return user.id === workout.userId
  }

  // User is able to edit his own workouts and only his own workouts
  async edit(user: User, workout: Workout) {
    return user.id === workout.userId
  }

  // User is able to delete his own workouts and only his own workouts
  async delete(user: User, workout: Workout) {
    return user.id === workout.userId
  }
}
