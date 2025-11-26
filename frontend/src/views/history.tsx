import Workout from "@/api/models/Workout";
import DrawerView from "@/Components/DrawerView";
import { useEffect, useState } from "react";

export default function History() {

  const [workouts, setWorkouts] = useState<Workout[]>([])
  useEffect(() => {
    Workout.browse().then((workouts) => setWorkouts(workouts))
  }, [])

  return (
    <DrawerView title="history">
      <ul>
        {workouts.map((workout) => <li><p>{workout.getDate().toLocaleDateString()}</p></li>)}
      </ul>
    </DrawerView>
  )
}