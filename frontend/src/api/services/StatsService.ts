import Api from "@/api/Api.ts";
import type {ChartPieDonutDataType} from "@/Components/ui/chart-pie-donut.tsx";

export default class StatsService {
    public static async getStats(): Promise<StatsSchema> {
        const response = await Api.get<StatsSchema>('stats')
        return response.body
    }

    public static workoutByMonthConvert(workoutsByMonth: WorkoutsByMonthsType[]) {
        return workoutsByMonth.map((monthWorkout) => {
            return {
                date: monthWorkout.monthName,
                total: monthWorkout.total,
            }
        })
    }

    public static topExerciseConvert(topExercises: TopExercisesType[]) {
        const data: ChartPieDonutDataType[] = topExercises.map((exercise, index) => {
            return {
                item: exercise.name,
                total: exercise.pourcentage,
                fill: this.getRandomPieChartColor(undefined, index)
            }
        })

        return data
    }

    public static weeklyMusclesUsageConvert(weeklyMuscleUsage: WeeklyMusclesUsageType[]): WeeklyChartDataType[] {
        const weekMap = new Map<string, WeeklyChartDataType>()

        weeklyMuscleUsage.forEach((muscle) => {
            muscle.weeklyData.forEach((weekData) => {
                const week = weekData.week

                if (!weekMap.has(week)) {
                    weekMap.set(week, {week})
                }

                const weekEntry = weekMap.get(week)!
                weekEntry[muscle.name] = weekData.total
            })
        })

        return Array.from(weekMap.values()).sort((a, b) =>
            a.week.localeCompare(b.week)
        )
    }

    static getRandomPieChartColor(opacity: number = 0.7, index: number): string {
        const colors = [
            `rgba(0, 0, 80, ${opacity})`,       // bleu marine très foncé
            `rgba(0, 0, 120, ${opacity})`,      // bleu marine
            `rgba(0, 0, 160, ${opacity})`,      // bleu foncé
            `rgba(0, 20, 180, ${opacity})`,     // bleu profond
            `rgba(0, 40, 200, ${opacity})`,     // bleu intense
            `rgba(0, 60, 220, ${opacity})`,     // bleu vif foncé
            `rgba(0, 80, 240, ${opacity})`,     // bleu électrique
            `rgba(20, 100, 255, ${opacity})`,   // bleu cobalt
            `rgba(40, 120, 255, ${opacity})`,   // bleu azur foncé
            `rgba(60, 140, 255, ${opacity})`,   // bleu azure
            `rgba(80, 160, 255, ${opacity})`,   // bleu ciel moyen
            `rgba(100, 180, 255, ${opacity})`,  // bleu clair
            `rgba(120, 195, 255, ${opacity})`,  // bleu ciel
            `rgba(140, 210, 255, ${opacity})`,  // bleu pastel
            `rgba(160, 220, 255, ${opacity})`,  // bleu ciel clair
            `rgba(180, 230, 255, ${opacity})`,  // bleu très clair
            `rgba(200, 240, 255, ${opacity})`,  // bleu pâle
            `rgba(220, 245, 255, ${opacity})`,  // bleu glacé
            `rgba(235, 250, 255, ${opacity})`,  // bleu presque blanc
            `rgba(245, 252, 255, ${opacity})`,  // bleu très pâle
        ]
        return colors[index % colors.length]
    }

    static getRandomLineChartColor(opacity: number = 0.7, index: number): string {
        const colors = [
            `rgba(255, 59, 48, ${opacity})`,    // Rouge vif
            `rgba(52, 199, 89, ${opacity})`,    // Vert
            `rgba(0, 122, 255, ${opacity})`,    // Bleu
            `rgba(255, 149, 0, ${opacity})`,    // Orange
            `rgba(175, 82, 222, ${opacity})`,   // Violet
            `rgba(255, 45, 85, ${opacity})`,    // Rose vif
            `rgba(88, 86, 214, ${opacity})`,    // Indigo
            `rgba(90, 200, 250, ${opacity})`,   // Cyan
            `rgba(255, 204, 0, ${opacity})`,    // Jaune
            `rgba(255, 55, 95, ${opacity})`,    // Rose-rouge
            `rgba(48, 209, 88, ${opacity})`,    // Vert clair
            `rgba(100, 210, 255, ${opacity})`,  // Bleu clair
            `rgba(191, 90, 242, ${opacity})`,   // Violet clair
            `rgba(255, 159, 10, ${opacity})`,   // Orange foncé
            `rgba(255, 69, 58, ${opacity})`,    // Rouge corail
            `rgba(30, 170, 120, ${opacity})`,   // Vert émeraude
            `rgba(10, 132, 255, ${opacity})`,   // Bleu Azure
            `rgba(94, 92, 230, ${opacity})`,    // Indigo vif
            `rgba(255, 100, 150, ${opacity})`,  // Rose bonbon
            `rgba(64, 200, 224, ${opacity})`,   // Turquoise
            `rgba(255, 214, 10, ${opacity})`,   // Jaune doré
            `rgba(142, 68, 173, ${opacity})`,   // Violet améthyste
            `rgba(230, 126, 34, ${opacity})`,   // Orange brûlé
            `rgba(46, 204, 113, ${opacity})`,   // Vert menthe
            `rgba(52, 152, 219, ${opacity})`,   // Bleu ciel
            `rgba(231, 76, 60, ${opacity})`,    // Rouge brique
            `rgba(155, 89, 182, ${opacity})`,   // Mauve
            `rgba(26, 188, 156, ${opacity})`,   // Vert turquoise
            `rgba(241, 196, 15, ${opacity})`,   // Jaune moutarde
            `rgba(230, 74, 25, ${opacity})`,    // Orange rouille
        ]
        return colors[index % colors.length]
    }
}

export type StatsSchema = {
    lastWorkoutData: LastWorkoutDataType
    totalWorkouts: number;
    workoutsByMonths: WorkoutsByMonthsType[]
    mostUsedMuscle: MostUsedMuscleType[]
    favouriteExercise: {
        name: string,
        total: string
    }
    topExercise: TopExercisesType[],
    weeklyMusclesUsage: WeeklyMusclesUsageType[]
}

type MostUsedMuscleType = {
    name: string,
    total: string
}

export type TopExercisesType = {
    name: string,
    total: number,
    pourcentage: number
}

export type WorkoutsByMonthsType = {
    month: string,
    monthName: string,
    total: number
}

export type WeeklyMusclesUsageType = {
    name: string,
    average: number,
    weeklyData: Array<{
        week: string,
        total: number
    }>
}

export type WeeklyChartDataType = {
    week: string,
    [muscleName: string]: number | string
}

export type LastWorkoutDataType = {
    date: string | null,
    daysBetween: number | null,
    message: string,
}