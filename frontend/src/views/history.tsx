import Workout from "@/api/models/Workout";
import DrawerView from "@/Components/DrawerView";
import WorkoutCard from "@/Components/WorkoutCard";
import { useEffect, useState } from "react";
import AddWorkout from "@/views/addWorkout";

export default function History() {

  const [workouts, setWorkouts] = useState<Workout[]>([])

  useEffect(() => {
    Workout.browse().then((workouts) => setWorkouts(workouts))
  }, [])

  return (
    <DrawerView title="history">
        
      <AddWorkout />
      <div className="flex flex-col lg:flex-row flex-wrap">
        {workouts.map((workout) => 
          <WorkoutCard key={workout.id} workout={workout}/>
        )}
      </div> 
      
    </DrawerView>
  )
}