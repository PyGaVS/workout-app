import AuthView from "@/Components/AuthView";
import {useEffect, useState} from "react";
import {useAuth} from "@/Provider/AuthProvider.tsx";
import StatsService, {
    type LastWorkoutDataType,
    type MostUsedMuscleType,
    type StatsSchema, type WeeklyChartDataType,
} from "@/api/services/StatsService.ts";
import StatCard from "@/Components/StatCard.tsx";
import {ChartAreaInteractive} from "@/Components/ui/chart-area-interactive.tsx";
import {ChartPieDonut, type ChartPieDonutDataType} from "@/Components/ui/chart-pie-donut.tsx";
import {ChartLineMultiple} from "@/Components/ui/chart-line-multiple.tsx";
import {Skeleton} from "@/Components/ui/skeleton.tsx";

export default function Dashboard() {
    const {user} = useAuth();
    const [stats, setStats] = useState<StatsSchema>();
    const [topExercises, setTopExercises] = useState<ChartPieDonutDataType[]>();
    const [workoutsByMonth, setWorkoutsByMonth] = useState<{ date: string, total: number }[]>([])
    const [weeklyMusclesUsage, setWeeklyMusclesUsage] = useState<WeeklyChartDataType[]>();
    const [lastWorkoutData, setLastWorkoutData] = useState<LastWorkoutDataType>();

    const [lastWorkoutDataText, setLastWorkoutDataText] = useState<string>("");

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
        const lastWorkoutData = statsRes.lastWorkoutData;

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

        if (lastWorkoutData.daysBetween) {
            const d = lastWorkoutData.daysBetween

            if (d < 5) {
                setLastWorkoutDataText("Tu t’es entraîné récemment🔥")
            } else if (d < 9) {
                setLastWorkoutDataText("Ça fait quelques jours💪")
            } else {
                setLastWorkoutDataText("Pitié reviens…🥀")
            }
        }
    }

    const getMostUsedMuscle = (): MostUsedMuscleType => {
        if (!stats?.mostUsedMuscle || stats.mostUsedMuscle.length === 0){
            return { name: "Aucun", total: "0" }
        };

        return {
            name: stats.mostUsedMuscle[0].name,
            total: stats.mostUsedMuscle[0].total ? stats.mostUsedMuscle[0].total : "0"
        }
    }

    return (
        <AuthView title="Tableau de bord">
            <div className="p-5 flex flex-col gap-8">
                <div>
                    <p className="text-xl sm:text-2xl text-3xl">Bonjour <span className="font-bold">{user.fullName}</span> 👋, visualisez
                        vos <span
                            className="italic">statistiques</span>.</p>
                </div>
                {stats && Object.keys(stats ? stats : {}).length > 0 ?
                    <div className="w-full grid grid-cols-2 xl:grid-cols-4 gap-4">
                        <StatCard statBadge={stats.favouriteExercise ? stats.favouriteExercise.total + " fois" : "0 fois"}
                                  statLabel="Exercice favoris"
                                  stat={stats.favouriteExercise ? stats.favouriteExercise.name : "Aucun"}
                                  statText="Vous êtes en bonne voie"
                                  statDescription="L'exercice qui apparait le plus dans vos sets"/>

                        <StatCard statLabel="Total de séance"
                                  stat={stats?.totalWorkouts + " séances"}
                                  statText="Quelle persévérence!"
                                  statDescription={"Nombre total de séance référencées"}/>

                        <StatCard statBadge={lastWorkoutData?.daysBetween + " jours"}
                                  statLabel="Dernière séance"
                                  stat={lastWorkoutData?.message}
                                  statText={lastWorkoutDataText}
                                  statDescription="Temps depuis lequel vous ne vous êtes pas entrainé"/>

                        <StatCard statBadge={getMostUsedMuscle().total + " fois"}
                                  statLabel="Muscle favori"
                                  stat={getMostUsedMuscle().name}
                                  statText="Bien ciblé!"
                                  statDescription="Le muscle que vous travaillez le plus"/>
                    </div>
                    :
                    <div className="w-full grid grid-cols-2 xl:grid-cols-4 gap-4">
                        <StatCard skeleton={true}/>
                        <StatCard skeleton={true}/>
                        <StatCard skeleton={true}/>
                        <StatCard skeleton={true}/>
                    </div>
                }

                <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] lg:gird-cols-[50%-50%] gap-4 w-full">
                    {workoutsByMonth.length > 0 ?
                        <div className="flex flex-col border-(--stats-border) border rounded-xl h-full w-[42/60]">
                            {workoutsByMonth && <ChartAreaInteractive data={workoutsByMonth}/>
                            }
                        </div>
                        :
                        <Skeleton className="flex flex-col border-gray-300 border rounded-xl w-42/60 h-80">
                        </Skeleton>
                    }
                    {topExercises ?
                        <div className="border-(--stats-border) border rounded-xl p-3 w-[18/60]">
                            <ChartPieDonut data={topExercises}/>
                        </div>
                        :
                        <Skeleton className="border-gray-300 border rounded-xl w-17/60 p-3 h-80"></Skeleton>
                    }

                </div>
                <div className="">
                    {weeklyMusclesUsage &&
                        <ChartLineMultiple data={weeklyMusclesUsage}/>
                    }
                </div>
            </div>
        </AuthView>
    )
}