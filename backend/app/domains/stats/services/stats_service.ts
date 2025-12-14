import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export class StatsService {
  async index(userId: number) {
    const res = await db
      .from('workouts')
      .join('exercise_blocs', 'workouts.id', '=', 'exercise_blocs.workout_id')
      .join('sets', 'sets.exercise_bloc_id', '=', 'exercise_blocs.id')
      .join('exercises', 'sets.exercise_id', '=', 'exercises.id')
      .avg('reps as avg')
      .where('user_id', userId)
    return Number(res[0].avg)
  }

  async workouts(id: number) {
    const res = await db.from('workouts').count('* as totalWorkouts').where('user_id', id)
    return Number(res[0].totalWorkouts)
  }

  async thisMonthWorkouts(userId: number) {
    const startOfMonth = DateTime.local().startOf('month').toJSDate()
    const endOfMonth = DateTime.local().endOf('month').toJSDate()

    const res = await db
      .from('workouts')
      .where('user_id', userId)
      .andWhere('date', '>=', startOfMonth)
      .andWhere('date', '<=', endOfMonth)
      .count('* as total')
    return Number(res[0].total)
  }

  async thisWeekWorkouts(userId: number) {
    const startOfWeek = DateTime.local().startOf('week').toJSDate()
    const endOfWeek = DateTime.local().endOf('week').toJSDate()

    const res = await db
      .from('workouts')
      .where('user_id', userId)
      .andWhere('date', '>=', startOfWeek)
      .andWhere('date', '<=', endOfWeek)
      .count('* as total')

    return Number(res[0].total)
  }

  async mostUsedMuscles(userId: number) {
    return db
      .from('workouts')
      .join('exercise_blocs', 'workouts.id', '=', 'exercise_blocs.workout_id')
      .join('sets', 'sets.exercise_bloc_id', '=', 'exercise_blocs.id')
      .join('exercises', 'sets.exercise_id', '=', 'exercises.id')
      .join('exercise_muscle', 'exercises.id', '=', 'exercise_muscle.exercise_id')
      .join('muscles', 'muscles.id', '=', 'exercise_muscle.muscle_id')
      .where('user_id', userId)
      .select('muscles.name')
      .count('* as total')
      .groupBy('muscles.name')
      .orderBy('total', 'desc')
      .limit(3)
  }

  async favouriteExercise(userId: number) {
    return await db
      .from('workouts')
      .join('exercise_blocs', 'workouts.id', '=', 'exercise_blocs.workout_id')
      .join('sets', 'sets.exercise_bloc_id', '=', 'exercise_blocs.id')
      .join('exercises', 'sets.exercise_id', '=', 'exercises.id')
      .where('user_id', userId)
      .select('exercises.name')
      .count('* as total')
      .groupBy('exercises.name')
      .orderBy('total', 'desc')
      .first()
  }

  async topExercises(userId: number) {
    let totalExercisesDone: number = 0
    const res = await db
      .from('workouts')
      .join('exercise_blocs', 'workouts.id', '=', 'exercise_blocs.workout_id')
      .join('sets', 'sets.exercise_bloc_id', '=', 'exercise_blocs.id')
      .join('exercises', 'sets.exercise_id', '=', 'exercises.id')
      .where('user_id', userId)
      .select('exercises.name')
      .count('* as total')
      .groupBy('exercises.name')
      .orderBy('total', 'desc')
    res.map((exercise) => {
      totalExercisesDone += Number(exercise.total)
    })

    res.map((exercise) => {
      exercise.total = Number(exercise.total)
      exercise.pourcentage = Number(((exercise.total / totalExercisesDone) * 100).toFixed(2))
    })

    return res
  }
}
