import type Workout from '@/api/models/Workout'
import { useState, type PropsWithChildren } from 'react'
import { ContextMenu, ContextMenuTrigger } from './ui/context-menu'
import WorkoutCardActions from './WorkoutCardActions'
import { Dialog } from './ui/dialog'
import WorkoutFormContent from './WorkoutFormContent'
import { useWorkoutForm } from '@/Provider/WorkoutFormProvider'

interface Props {
  workout: Workout
  refresh: () => void
}

export default function WorkoutCard(props: PropsWithChildren<Props>){

  const [editMode, setEditMode] = useState(false);
  const form = useWorkoutForm();

  const onOpen = () => {
    if(!editMode){
      form.setWorkout(props.workout);
    }
    setEditMode(!editMode);

  }

  return (
    <Dialog key={props.workout.id} open={editMode} onOpenChange={onOpen}>
      <ContextMenu key={props.workout.id} modal={false}>
        <ContextMenuTrigger className="bg-bg shadow-md rounded-(--radius) p-5 m-1 mb-4 min-w-md max-w-1/2 w-md grow
        hover:shadow-xl transition-shadow duration-300 border border-border">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-text">
              Workout {props.workout.dateStr()}
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {props.workout.exerciseBlocs.map((bloc) => (
              <div key={bloc.id} className="bg-bg p-3 rounded-md border-l-4 border-primary">
                <h3 className="text-xl font-semibold text-secondary">{bloc.title}</h3>
                  <ul className="mt-1 text-text-muted text-sm list-disc list-inside">
                    {bloc.sets.map((set) => (
                      <li key={set.id}>
                        <span className="font-medium text-text">{set.exercise.name}</span> {set.reps}×{set.weight} kg
                        {set.comment && <span className="text-accent"> - "{set.comment}"</span>}
                      </li>
                    ))}
                  </ul>
              </div>
            ))}
          </div>
        </ContextMenuTrigger>
        <WorkoutCardActions workout={props.workout} refresh={props.refresh} />
      </ContextMenu>
      <WorkoutFormContent workout={props.workout} setOpen={setEditMode} edit />
    </Dialog>
  )
}