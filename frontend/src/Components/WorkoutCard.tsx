import type Workout from '@/api/models/Workout'
import { useState, type PropsWithChildren } from 'react'
import { ContextMenu, ContextMenuTrigger } from './ui/context-menu'
import WorkoutCardActions from './WorkoutCardActions'
import { Dialog } from './ui/dialog'
import WorkoutFormContent from './workoutForm/WorkoutFormContent'
import { useWorkoutForm } from '@/Provider/WorkoutFormProvider'
import SetItem from './SetItem'
import { getFrDateLong } from '@/lib/utils'

interface Props {
  workout: Workout
  skeleton?: boolean
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
        <ContextMenuTrigger className="bg-surface shadow-md rounded-(--radius) p-6 m-2 mb-4 min-w-md max-w-1/2 w-md grow
        hover:shadow-xl transition-all duration-200 border border-border">
          {/* Header */}
          <div className='items-center mb-6 border-b border-border pb-4'>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Entraînement</span>
            <h2 className="text-text font-bold text-lg flex items-center gap-2">
              {props.workout.date.getTime() > Date.now() ? <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> : null}
              {getFrDateLong(props.workout.date)}
            </h2>
          </div>

          <div className="space-y-6">
            {props.workout.exerciseBlocs.map((bloc) => (
              <div key={bloc.id} className="group">
                <h3 className="text-secondary font-bold text-md mb-3">{bloc.title}</h3>
                  <div className="space-y-2">
                    {bloc.getSetsWithMultiplier().map((set) => (
                      <SetItem set={set} />
                    ))}
                  </div>
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