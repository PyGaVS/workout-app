import Workout from "@/api/models/Workout";
import DrawerView from "@/Components/DrawerView";
import WorkoutCard from "@/Components/WorkoutCard";
import { createContext, useEffect, useState } from "react";
import WorkoutModal from "@/views/WorkoutModal";
import Exercise from "@/api/models/Exercise";
import { WorkoutFormProvider } from "@/Provider/WorkoutFormProvider";
import WorkoutService from "@/api/services/WorkoutService";
import ExerciseService from "@/api/services/ExerciseService";
import { Dumbbell } from "lucide-react";

export default function History() {

  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [exercises, setExercises] = useState<Exercise[]>([])

  useEffect(() => {
    WorkoutService.browse().then((workouts) => setWorkouts(workouts))
    ExerciseService.browse().then((exercises) => setExercises(exercises))
  }, [])


  const refresh = () => {
    WorkoutService.browse().then((workouts) => setWorkouts(workouts))
  }

  return (
    <DrawerView title="history">
      <WorkoutFormProvider exercises={exercises}>
        <WorkoutModal>
          <button className="bg-text text-surface inline-flex px-2 py-3 rounded-radius my-3 mx-6 border-none
          shadow-md transition-all duration-300 hover:bg-accent hover:shadow-lg hover:scale-105">
            <Dumbbell className="mx-1"/> Save workout
          </button> 
        </WorkoutModal>
        <div className="flex flex-col lg:flex-row flex-wrap justify-center">
          {workouts.map((workout) => 
            <WorkoutCard key={workout.id} workout={workout} refresh={refresh} />
          )}
        </div>      
      </WorkoutFormProvider>
    </DrawerView>
  )
}