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
      <h1 className="text-blue-400">History allo</h1>
      <ul>
        {workouts.map((workout) => <li>{workout.getDate().toString()}</li>)}
      </ul>
    </DrawerView>
  )
}