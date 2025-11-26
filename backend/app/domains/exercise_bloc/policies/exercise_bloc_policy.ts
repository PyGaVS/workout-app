import { BasePolicy } from '@adonisjs/bouncer'
import { inject } from '@adonisjs/core'
import { PermissionService } from '#commons/permissions/permission_service'
import { Permissions } from '#commons/permissions/permissions_enum'
import User from '#commons/models/user'
import OwnerResolver from '#commons/utils/owner_resolver'
import ExerciseBloc from '#commons/models/exercise_bloc'

@inject()
export default class ExerciseBlocPolicy extends BasePolicy {
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

  // User is able to browse exercise_blocs (maybe to get inspiration)
  async browse() {
    return true
  }

  // User is able to create an exercise_bloc, but only link to one of his workouts
  async create(user: User) {
    return this.permissionService.hasPermission(user, Permissions.MANAGE_EXERCISE_BLOC)
  }

  // User is able to see his own exercise_blocs, maybe could see other ones blocs as an example for him
  async view(user: User, exerciseBloc: ExerciseBloc) {
    if ((await this.ownerResolver.findOwner(exerciseBloc)) === user) {
      return {
        authorized: false,
        message: `You are not the owner of this exercise bloc`,
      }
    }
    return this.permissionService.hasPermission(user, Permissions.VIEW_EXERCISE_BLOC)
  }

  // User is able to edit his own exercise_blocs, and only his own exercise_blocs
  async edit(user: User, eb: ExerciseBloc) {
    const owner = await this.ownerResolver.findOwner(eb)
    if (owner === null) {
      return {
        authorized: false,
        message: 'Owner cant be found',
      }
    }
    if (owner.id !== user.id) {
      return {
        authorized: false,
        message: `You are not the owner of this exercise bloc`,
      }
    }
    return this.permissionService.hasPermission(user, Permissions.MANAGE_EXERCISE_BLOC)
  }

  // User is able to delete his own exercise_blocs and only his own exercise_blocs
  async delete() {
    return true
  }
}
