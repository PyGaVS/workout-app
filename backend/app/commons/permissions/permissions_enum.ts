export enum Permissions {
  CREATE_WORKOUT = 1 << 0,
  EDIT_WORKOUT = 1 << 1,
  DELETE_WORKOUT = 1 << 2,
  VIEW_STATS = 1 << 3,
  ADMIN_PANEL = 1 << 24,
}
