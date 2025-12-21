import DrawerView from "@/Components/DrawerView";
import {useEffect, useState} from "react";
import {useAuth} from "@/Provider/AuthProvider.tsx";
import StatsService, {
    type LastWorkoutDataType,
    type StatsSchema, type WeeklyChartDataType,
} from "@/api/services/StatsService.ts";
import StatCard from "@/Components/StatCard.tsx";
import {ChartAreaInteractive} from "@/Components/ui/chart-area-interactive.tsx";
import {ChartPieDonut, type ChartPieDonutDataType} from "@/Components/ui/chart-pie-donut.tsx";
import {ChartLineMultiple} from "@/Components/ui/chart-line-multiple.tsx";

export default function Dashboard() {
    const {user} = useAuth();
    const [stats, setStats] = useState<StatsSchema>();
    const [topExercises, setTopExercises] = useState<ChartPieDonutDataType[]>();
    const [workoutsByMonth, setWorkoutsByMonth] = useState<{ date: string, total: number }[]>([])
    const [weeklyMusclesUsage, setWeeklyMusclesUsage] = useState<WeeklyChartDataType[]>();
    const [lastWorkoutData, setLastWorkoutData] = useState<LastWorkoutDataType>();

    useEffect(() => {
        StatsService.getStats().then((statsRes) => {
            setStats(statsRes)
            defineStats(statsRes)
        })
    }, [])

    const defineStats = (statsRes: StatsSchema) => {
        const topExercises = statsRes.topExercise;
        const workoutsMonths = statsRes.workoutsByMonths;
        const weeklyMusclesUsageTemp = statsRes.weeklyMusclesUsage;
        const lastWorkoutData = statsRes.lastWorkoutData

        // Convertir les données pour l'affichage
        const convertedWorkouts = StatsService.workoutByMonthConvert(workoutsMonths);
        setWorkoutsByMonth(convertedWorkouts);

        const convertedTopExercises = StatsService.topExerciseConvert(topExercises);
        setTopExercises(convertedTopExercises)

        const convertedWeeklyMusclesUsage = StatsService.weeklyMusclesUsageConvert(weeklyMusclesUsageTemp)
        setWeeklyMusclesUsage(convertedWeeklyMusclesUsage)

        if (lastWorkoutData) {
            setLastWorkoutData(lastWorkoutData);
        }
    }

    return (
        <DrawerView title="dashboard">
            <div className="p-5 flex flex-col gap-8">
                <div>
                    <p className="text-3xl">Bonjour <span className="font-bold">{user.fullName}</span> 👋, visualisez
                        vos <span
                            className="italic">statistiques</span>.</p>
                </div>
                <div className="w-full flex gap-4">
                    <StatCard statBadge={stats?.favouriteExercise.total + " fois"}
                              statLabel="Exercice favoris"
                              stat={stats?.favouriteExercise.name}
                              statText="Vous êtes en bonne voie"
                              statDescription="L'exercice qui apparait le plus dans vos sets"/>

                    <StatCard statLabel="Total de séance"
                              stat={stats?.totalWorkouts + " séances"}
                              statText="Quelle persévérence!"
                              statDescription={"Nombre total de séance référencées"}/>

                    <StatCard statBadge={lastWorkoutData?.daysBetween + " jours"}
                              statLabel="Dernière séance"
                              stat={lastWorkoutData?.message}
                              statText="Continue comme ça 💪"
                              statDescription="Temps depuis lequel vous ne vous êtes pas entrainé"/>

                    <StatCard statBadge={stats?.mostUsedMuscle[0]?.total + " fois"}
                              statLabel="Muscle favori"
                              stat={stats?.mostUsedMuscle[0]?.name}
                              statText="Bien ciblé!"
                              statDescription="Le muscle que vous travaillez le plus"/>
                </div>
                {workoutsByMonth.length > 0 && (
                    <div className="flex justify-between">
                        <div className="flex flex-col border-gray-300 border-1 rounded-xl w-42/60 h-full">
                            {workoutsByMonth && <ChartAreaInteractive data={workoutsByMonth}/>}
                        </div>
                        <div className="border-gray-300 border-1 rounded-xl w-17/60 p-3">
                            {/*{topExercise && <DoughnutChart data={topExercise}/>}*/}
                            {topExercises && <ChartPieDonut data={topExercises}/>}
                        </div>
                    </div>
                )}
                <div className="">
                    {weeklyMusclesUsage &&
                        <ChartLineMultiple data={weeklyMusclesUsage}/>
                    }
                </div>
            </div>
        </DrawerView>
    )
}