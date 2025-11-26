import Workout from "@/api/models/Workout";
import DrawerView from "@/Components/DrawerView";
import WorkoutCard from "@/Components/WorkoutCard";
import { useEffect, useState } from "react";

export default function History() {

  const [workouts, setWorkouts] = useState<Workout[]>([])
  useEffect(() => {
    Workout.browse().then((workouts) => setWorkouts(workouts))
  }, [])

  return (
    <DrawerView title="history">
      <div className="flex flex-col lg:flex-row flex-wrap">
        {workouts.map((workout) => 
          <WorkoutCard workout={workout}/>
        )}
      </div>
    </DrawerView>
  )
}