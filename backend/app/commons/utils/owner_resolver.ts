import User from '#commons/models/user'
import Set from '#commons/models/set'
import ExerciseBloc from '#commons/models/exercise_bloc'
import Workout from '#commons/models/workout'
import SetService from '#domains/set/services/set_service'
import ExerciseBlocService from '#domains/exercise_bloc/services/exercise_bloc_service'
import WorkoutService from '#domains/workout/services/workout_service'
import UserService from '#domains/user/services/user_service'
import { inject } from '@adonisjs/core'

export type AnyEntity = User | Workout | ExerciseBloc | Set | string

@inject()
export default class OwnerResolver {
  constructor(
    protected userService: UserService,
    protected workoutService: WorkoutService,
    protected exerciseBlocService: ExerciseBlocService,
    protected setService: SetService
  ) {}

  /**
   * Try to resolve the owner User from various possible inputs.
   * Returns the User instance or null if not found / cannot resolve.
   */
  async findOwner(input: AnyEntity): Promise<User | null> {
    // 1) If input already is a User instance
    if (this.isUser(input)) {
      return input as User
    }

    // 2) If input is a Workout instance
    if (this.isWorkout(input)) {
      const workout = input as Workout
      if (workout.userId) {
        return this.userService.findById(workout.userId)
      }
      // if workout.owner relation loaded
      if ((workout as any).user) {
        return (workout as any).user as User
      }
    }

    // 3) If input is an ExerciseBloc instance
    if (this.isExerciseBloc(input)) {
      const eb = input as ExerciseBloc
      // try direct chain: eb.workout?.userId
      if ((eb as any).workout) {
        const workout = (eb as any).workout as Workout
        if (workout.userId) return this.userService.findById(workout.userId)
        if ((workout as any).user) return (workout as any).user as User
      }
      // fallback: load exerciseBloc with workout relation via service
      if (eb.id) {
        const loaded = await this.exerciseBlocService.findByIdWithRelations(eb.id)
        if (loaded && (loaded as any).workout) {
          const w = (loaded as any).workout as Workout
          if (w.userId) return this.userService.findById(w.userId)
          if ((w as any).user) return (w as any).user as User
        }
      }
    }

    // 4) If input is a Set instance
    if (this.isSet(input)) {
      const set = input as Set
      // set -> exerciseBloc -> workout -> user
      if ((set as any).exerciseBloc) {
        const eb = (set as any).exerciseBloc as ExerciseBloc
        if ((eb as any).workout) {
          const w = (eb as any).workout as Workout
          if (w.userId) return this.userService.findById(w.userId)
          if ((w as any).user) return (w as any).user as User
        }
      }
      // fallback: load set with relations
      if (set.id) {
        const loaded = await this.setService.findByIdWithRelations(set.id)
        if (loaded && (loaded as any).exerciseBloc && (loaded as any).exerciseBloc.workout) {
          const w = (loaded as any).exerciseBloc.workout as Workout
          if (w.userId) return this.userService.findById(w.userId)
          if ((w as any).user) return (w as any).user as User
        }
      }
    }

    // 5) If input is a string assume it's an id: try services in order of likelihood
    if (typeof input === 'string') {
      const id = input

      // try workout
      const workout = await this.workoutService.findByIdWithRelations?.(id).catch(() => null)
      if (workout) {
        if (workout.userId) return this.userService.findById(workout.userId)
        if ((workout as any).user) return (workout as any).user as User
      }

      // try exerciseBloc
      const eb = await this.exerciseBlocService.findByIdWithRelations(id).catch(() => null)
      if (eb && (eb as any).workout) {
        const w = (eb as any).workout as Workout
        if (w.userId) return this.userService.findById(w.userId)
        if ((w as any).user) return (w as any).user as User
      }

      // try set
      const set = await this.setService.findByIdWithRelations(id).catch(() => null)
      if (set && (set as any).exerciseBloc && (set as any).exerciseBloc.workout) {
        const w = (set as any).exerciseBloc.workout as Workout
        if (w.userId) return this.userService.findById(w.userId)
        if ((w as any).user) return (w as any).user as User
      }
    }

    // nothing resolved
    return null
  }

  // Type guards
  private isUser(obj: unknown): obj is User {
    return !!obj && typeof (obj as any).id === 'string' && (obj as any).email !== undefined
  }

  private isWorkout(obj: unknown): obj is Workout {
    return !!obj && typeof (obj as any).id === 'string' && 'userId' in (obj as any)
  }

  private isExerciseBloc(obj: unknown): obj is ExerciseBloc {
    return !!obj && typeof (obj as any).id === 'string' && 'workoutId' in (obj as any)
  }

  private isSet(obj: unknown): obj is Set {
    return !!obj && typeof (obj as any).id === 'string' && 'exerciseBlocId' in (obj as any)
  }
}
