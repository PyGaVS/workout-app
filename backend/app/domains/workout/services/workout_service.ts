import Workout from '#commons/models/workout'
import {
  CreateWorkoutSchema,
  UpdateWorkoutSchema,
} from '#domains/workout/validators/workouts_validator'
import ExerciseBloc from '#commons/models/exercise_bloc'
import SetModel from '#commons/models/set'

export default class WorkoutService {
  async getWorkouts(userId: number) {
    return Workout.query()
      .where('user_id', userId)
      .preload('exerciseBlocs', (blocQuery) => {
        blocQuery.preload('sets', (setQuery) => {
          setQuery.preload('exercise', (muscleQuery) => {
            muscleQuery.preload('muscles')
          })
        })
      })
      .orderBy('date', 'desc')
  }

  async findByIdWithRelations(workoutId: string | number) {
    return await Workout.query().where('id', workoutId).preload('user').firstOrFail()
  }

  async create(data: CreateWorkoutSchema, userId: number) {
    const workout = await Workout.create({
      date: data.date,
      userId,
    })

    if (data.exercise_blocs) {
      for (const bloc of data.exercise_blocs) {
        const exerciseBloc = await workout.related('exerciseBlocs').create({
          title: bloc?.title,
        })
        if (bloc && bloc.sets) {
          for (const set of bloc.sets) {
            await exerciseBloc.related('sets').create({
              exerciseId: set?.exercise_id,
              reps: set?.reps,
              weight: set?.weight,
              comment: set?.comment,
              restTime: set?.restTime,
              tempo: set?.tempo,
            })
          }
        }
      }
    }

    await workout.load('exerciseBlocs', (blocQuery) => {
      blocQuery.preload('sets')
    })

    return workout
  }

  async update(data: UpdateWorkoutSchema, workout: Workout) {
    const id = workout.id
    await workout.delete()

    const newWorkout = await Workout.create({
      id,
      date: data.date,
      userId: workout.userId,
    })

    if (data.exercise_blocs) {
      for (const bloc of data.exercise_blocs) {
        const exerciseBloc = await newWorkout.related('exerciseBlocs').create({
          title: bloc?.title,
        })
        if (bloc && bloc.sets) {
          for (const set of bloc.sets) {
            await exerciseBloc.related('sets').create({
              exerciseId: set?.exercise_id,
              reps: set?.reps,
              weight: set?.weight,
              comment: set?.comment,
              restTime: set?.restTime,
              tempo: set?.tempo,
            })
          }
        }
      }
    }

    await newWorkout.load('exerciseBlocs', (blocQuery) => {
      blocQuery.preload('sets')
    })

    return newWorkout
  }

  async delete(workout: Workout) {
    await workout.delete()

    return workout.$isDeleted
  }
}
