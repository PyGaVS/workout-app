import Workout from "@/api/models/Workout";
import DrawerView from "@/Components/DrawerView";
import WorkoutCard from "@/Components/WorkoutCard";
import { useEffect, useState } from "react";
import AddWorkout from "@/views/addWorkout";
import Exercise from "@/api/models/Exercise";
import { WorkoutFormProvider } from "@/Provider/WorkoutFormProvider";
import WorkoutService from "@/api/services/WorkoutService";
import ExerciseService from "@/api/services/ExerciseService";

export default function History() {

  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [exercises, setExercises] = useState<Exercise[]>([])

  useEffect(() => {
    WorkoutService.browse().then((workouts) => setWorkouts(workouts))
    ExerciseService.browse().then((exercises) => setExercises(exercises))
  }, [])

  return (
    <DrawerView title="history">
      
      <WorkoutFormProvider exercises={exercises}>
        <AddWorkout />
      </WorkoutFormProvider>

      <div className="flex flex-col lg:flex-row flex-wrap justify-center">
        {workouts.map((workout) => 
          <WorkoutCard key={workout.id} workout={workout}/>
        )}
      </div>       
    </DrawerView>
  )
}