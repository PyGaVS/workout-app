import { Permissions } from '#commons/permissions/permissions_enum'

export function computeBitfield(perms: Permissions[]): number {
  return perms.reduce((acc, p) => acc | p, 0)
}
