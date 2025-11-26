import Workout from "@/api/models/Workout";
import DrawerView from "@/Components/DrawerView";
import WorkoutCard from "@/Components/WorkoutCard";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import AddWorkout from "@/views/addWorkout";

export default function History() {

  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [addWorkoutModal, setAddWorkoutModal] = useState<boolean>(false)

  useEffect(() => {
    Workout.browse().then((workouts) => setWorkouts(workouts))
  }, [])

  return (
    <DrawerView title="history">
        <button className="!bg-primary text-[var(--surface)] inline-block px-2 py-3 rounded-[var(--radius)] my-3 mx-6" onClick={() => setAddWorkoutModal(true)}>
          <i className="fa-solid fa-dumbbell fa-xl pr-1" /> Save workout
        </button>
      <div className="flex flex-col lg:flex-row flex-wrap">
        {workouts.map((workout) => 
          <WorkoutCard workout={workout}/>
        )}
      </div>
      {addWorkoutModal ? 
      <AddWorkout></AddWorkout>
      : null}
    </DrawerView>
  )
}