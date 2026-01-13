import Workout from "@/api/models/Workout";
import AuthView from "@/Components/AuthView";
import WorkoutCard from "@/Components/WorkoutCard";
import { useEffect, useState } from "react";
import WorkoutModal from "@/views/WorkoutModal";
import Exercise from "@/api/models/Exercise";
import { WorkoutFormProvider } from "@/Provider/WorkoutFormProvider";
import WorkoutService from "@/api/services/WorkoutService";
import ExerciseService from "@/api/services/ExerciseService";
import { Dumbbell } from "lucide-react";
import { Input } from "@/Components/ui/input";

export default function History() {

  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [dateFilter, setDateFilter] = useState<Date | null>(null);

  useEffect(() => {
    WorkoutService.browse().then((workouts) => setWorkouts(workouts))
    ExerciseService.browse().then((exercises) => setExercises(exercises))
  }, [])

  useEffect(() => {
    console.log("allo")
    WorkoutService.browse(dateFilter).then((workouts) => setWorkouts(workouts))
  }, [dateFilter])


  const refresh = () => {
    WorkoutService.browse().then((workouts) => setWorkouts(workouts))
  }
  
  const onDateFilterChange = (value: string) => {
    setDateFilter(new Date(value))
  }

  return (
    <AuthView title="Historique">
      <WorkoutFormProvider exercises={exercises}>
        <div className="flex items-center justify-between gap-9 py-3 px-6">
          <WorkoutModal>
            <button className="bg-text text-surface w-min text-nowrap inline-flex px-2 py-3 rounded-radius border-none
            shadow-md transition-all duration-300 hover:bg-accent hover:shadow-lg hover:scale-105">
              <Dumbbell className="mx-1"/> Save workout
            </button> 
          </WorkoutModal>
          <Input className="max-w-100" id="dateFilter" type="date" 
              onChange={(e) => onDateFilterChange(e.target.value)} 
              value={dateFilter ? dateFilter.toLocaleDateString('en-CA') : ""} />
        </div>
        <div className="flex flex-col lg:flex-row flex-wrap justify-center">
          {workouts.map((workout) => 
            <WorkoutCard key={workout.id} workout={workout} refresh={refresh} />
          )}
        </div>      
      </WorkoutFormProvider>
    </AuthView>
  )
}