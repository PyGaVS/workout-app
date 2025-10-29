import User from '#commons/models/user'
import { Permissions } from '#commons/permissions/permissions_enum'

export class PermissionService {
  async fromBitfield(bitfield: number): Promise<Permissions[]> {
    return Object.entries(Permissions)
      .filter(([_key, value]) => typeof value === 'number' && (bitfield & value) === value)
      .map(([key]) => Permissions[key as keyof typeof Permissions])
  }

  async computeBitfield(perms: Permissions[]): Promise<number> {
    return perms.reduce((acc, p) => acc | p, 0)
  }

  async hasPermission(user: User, permission: Permissions): Promise<boolean> {
    return (user.permissions & permission) === permission
  }

  async hasSomePermissions(user: User, permissions: Permissions[]): Promise<boolean> {
    return permissions.some((perm) => (user.permissions & perm) === perm)
  }
}
