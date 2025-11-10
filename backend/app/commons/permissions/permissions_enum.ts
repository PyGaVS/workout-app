export enum Permissions {
  // Workout
  VIEW_WORKOUT = 1 << 0,
  MANAGE_WORKOUT = 1 << 1,
  // Exercise_Bloc
  VIEW_EXERCISE_BLOC = 1 << 3,
  MANAGE_EXERCISE_BLOC = 1 << 4,
  // Set
  VIEW_SET = 1 << 6,
  MANAGE_SET = 1 << 7,
  // Exercise
  VIEW_EXERCISE = 1 << 9,
  MANAGE_EXERCISE = 1 << 10,
  // Muscle
  VIEW_MUSCLE = 1 << 12,
  MANAGE_MUSCLE = 1 << 13,
  // User
  VIEW_USER = 1 << 15,
  MANAGE_USER = 1 << 16,

  // Stats
  VIEW_STATS = 1 << 18,

  //Admin
  ADMIN = 1 << 21,
}

export const defaultUserPermissions = [
  Permissions.VIEW_WORKOUT,
  Permissions.MANAGE_WORKOUT,
  Permissions.VIEW_EXERCISE_BLOC,
  Permissions.MANAGE_EXERCISE_BLOC,
  Permissions.VIEW_SET,
  Permissions.MANAGE_SET,
  Permissions.VIEW_EXERCISE,
  Permissions.VIEW_MUSCLE,
  Permissions.VIEW_STATS,
  Permissions.VIEW_USER,
]

export const defaultAdminPermissions = [
  Permissions.VIEW_WORKOUT,
  Permissions.MANAGE_WORKOUT,
  Permissions.VIEW_EXERCISE_BLOC,
  Permissions.MANAGE_EXERCISE_BLOC,
  Permissions.VIEW_SET,
  Permissions.MANAGE_SET,
  Permissions.VIEW_EXERCISE,
  Permissions.MANAGE_EXERCISE,
  Permissions.VIEW_MUSCLE,
  Permissions.MANAGE_MUSCLE,
  Permissions.VIEW_STATS,
  Permissions.VIEW_USER,
  Permissions.MANAGE_USER,
  Permissions.ADMIN,
]
