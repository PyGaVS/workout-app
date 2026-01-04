import type Workout from '@/api/models/Workout'
import { useState, type PropsWithChildren } from 'react'
import { ContextMenu, ContextMenuTrigger } from './ui/context-menu'
import WorkoutCardActions from './WorkoutCardActions'
import { Dialog } from './ui/dialog'
import WorkoutFormContent from './workoutForm/WorkoutFormContent'
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
        <ContextMenuTrigger className="bg-surface shadow-md rounded-(--radius) p-6 m-2 mb-4 min-w-md max-w-1/2 w-md grow
        hover:shadow-xl transition-all duration-200 border border-border">
          {/* Header */}
          <div className='items-center mb-6 border-b border-border pb-4'>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Entraînement</span>
            <h2 className="text-text font-bold text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              {props.workout.dateStr()}
            </h2>
          </div>

          <div className="space-y-6">
            {props.workout.exerciseBlocs.map((bloc) => (
              <div key={bloc.id} className="group">
                <h3 className="text-secondary font-bold text-md mb-3">{bloc.title}</h3>
                  <div className="space-y-2">
                    {bloc.sets.map((set) => (
                      <div key={set.id} className='bg-bg/50 rounded-lg p-3 border border-transparent'>
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col">
                            <span className="font-semibold text-text">{set.exercise.name}</span>
                              {set.comment && (
                                <span className="text-xs italic text-accent mt-1">
                                  " {set.comment} "
                                </span>
                              )}
                          </div>
                
                          <div className="flex items-center gap-4 text-right">
                            <div className="flex flex-col">
                              <span className="text-xl font-black text-secondary leading-none">{set.reps}</span>
                              <span className="text-[0.6rem] uppercase text-text-muted font-bold">Reps</span>
                            </div>
                            <div className="h-8 w-px bg-border"></div>
                            <div className="flex flex-col">
                              <span className="text-xl font-black text-primary leading-none">{set.weight}<small className="text-xs ml-0.5">kg</small></span>
                              <span className="text-[0.6rem] uppercase text-text-muted font-bold">Poids</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-border/50 flex gap-4 text-[11px] font-medium text-text-muted">
                          {set.tempo && (
                            <span className="flex items-center gap-1">
                              <span className="text-secondary">Tempo:</span> {set.tempo}
                            </span>
                          )}
                          {set.restTime > 0 && (
                            <span className="flex items-center gap-1 text-accent">
                              <span className="text-secondary">Repos:</span> {set.restTime}s
                            </span>
                          )}
                        </div>
                      </div>
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