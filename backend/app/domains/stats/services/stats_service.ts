import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export class StatsService {
  async workouts(id: number) {
    const res = await db.from('workouts').count('* as totalWorkouts').where('user_id', id)
    return Number(res[0].totalWorkouts)
  }

  async workoutsByMonths(userId: number) {
    const startOfYear = DateTime.local().minus({ months: 11 }).startOf('month').toJSDate()
    const endOfMonth = DateTime.local().endOf('month').toJSDate()

    // Récupérer les workouts groupés par mois (PostgreSQL)
    const workoutsByMonth = await db
      .from('workouts')
      .where('user_id', userId)
      .andWhere('date', '>=', startOfYear)
      .andWhere('date', '<=', endOfMonth)
      .select(db.raw("to_char(date, 'YYYY-MM') as month"))
      .count('* as total')
      .groupByRaw("to_char(date, 'YYYY-MM')")
      .orderBy('month', 'asc')

    // Créer un Map pour un accès rapide
    const workoutsMap = new Map(workoutsByMonth.map((w) => [w.month, Number(w.total)]))

    // Créer un tableau avec tous les 12 derniers mois
    const last12Months = []
    for (let i = 11; i >= 0; i--) {
      const month = DateTime.local().minus({ months: i }).startOf('month')
      const monthKey = month.toFormat('yyyy-MM')

      last12Months.push({
        month: monthKey,
        monthName: month.toFormat('yyyy-MM-dd'),
        total: workoutsMap.get(monthKey) || 0,
      })
    }

    return last12Months
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

  async lastWorkoutData(userId: number) {
    const todayDate = DateTime.local()
    const date = new Date().toISOString().split('T')[0]

    const data = await db
      .from('workouts')
      .where('user_id', userId)
      .where('date', '<=', date)
      .select('date')
      .orderBy('date', 'desc')
      .first()

    if (!data) {
      return {
        lastWorkoutDate: null,
        daysBetween: null,
        message: 'Aucune séance trouvée',
      }
    }

    const lastWorkoutDate = DateTime.fromJSDate(data.date)
    const daysBetween = Math.floor(todayDate.diff(lastWorkoutDate, 'days').days)

    return {
      lastWorkoutDate: lastWorkoutDate.toFormat('yyyy-MM-dd'),
      daysBetween,
      message:
        daysBetween === 0
          ? "Aujourd'hui"
          : daysBetween === 1
            ? 'Hier'
            : `Il y a ${daysBetween} jours`,
    }
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

    return res.slice(0, 15)
  }

  async musclesUsageAverage(userId: number) {
    // Calculer la date de début (il y a 20 semaines)
    const startDate = DateTime.local().minus({ weeks: 20 }).startOf('week').toJSDate()
    const endDate = DateTime.local().endOf('week').toJSDate()

    // 1. Récupérer TOUS les muscles de la base de données
    const allMuscles = await db.from('muscles').select('id', 'name').orderBy('name', 'asc')

    // 2. Créer le tableau des 20 dernières semaines
    const last20Weeks: string[] = []
    for (let i = 19; i >= 0; i--) {
      const week = DateTime.local().minus({ weeks: i }).startOf('week')
      last20Weeks.push(week.toFormat('kkkk-WW')) // Format ISO: "2024-01"
    }

    // 3. Récupérer les données d'utilisation réelles
    const musclesByWeek = await db
      .from('workouts')
      .join('exercise_blocs', 'workouts.id', '=', 'exercise_blocs.workout_id')
      .join('sets', 'sets.exercise_bloc_id', '=', 'exercise_blocs.id')
      .join('exercises', 'sets.exercise_id', '=', 'exercises.id')
      .join('exercise_muscle', 'exercises.id', '=', 'exercise_muscle.exercise_id')
      .join('muscles', 'muscles.id', '=', 'exercise_muscle.muscle_id')
      .where('user_id', userId)
      .andWhere('date', '>=', startDate)
      .andWhere('date', '<=', endDate)
      .select('muscles.id as muscle_id')
      .select('muscles.name as muscle_name')
      .select(db.raw("to_char(date, 'IYYY-IW') as week"))
      .count('* as total')
      .groupBy('muscles.id', 'muscles.name')
      .groupByRaw("to_char(date, 'IYYY-IW')")

    // 4. Créer une Map pour accès rapide aux données réelles
    const usageMap = new Map<string, Map<string, number>>()

    musclesByWeek.forEach((row) => {
      const muscleId = String(row.muscle_id)
      const week = row.week as string
      const total = Number(row.total)

      if (!usageMap.has(muscleId)) {
        usageMap.set(muscleId, new Map<string, number>())
      }
      usageMap.get(muscleId)!.set(week, total)
    })

    // 5. Construire le résultat final avec TOUS les muscles
    const result = allMuscles.map((muscle) => {
      const muscleId = String(muscle.id)
      const weeklyData = last20Weeks.map((week) => {
        const usageForWeek = usageMap.get(muscleId)?.get(week) || 0
        return {
          week,
          total: usageForWeek,
        }
      })

      // Calculer la moyenne sur 20 semaines
      const totalUsage = weeklyData.reduce((sum, item) => sum + item.total, 0)
      const average = totalUsage / 20

      return {
        name: muscle.name,
        average: Number(average.toFixed(2)),
        weeklyData,
        totalUsage,
        weeksActive: weeklyData.filter((w) => w.total > 0).length,
      }
    })

    // Trier par moyenne décroissante
    return result.sort((a, b) => b.average - a.average)
  }
}
