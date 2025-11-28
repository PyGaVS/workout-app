import type Workout from '@/api/models/Workout'
import type { PropsWithChildren } from 'react'

interface Props {
  workout: Workout
}

export default function WorkoutCard(props: PropsWithChildren<Props>){
  return (
    <div className="bg-[var(--surface)] shadow-md rounded-[var(--radius)] p-5 m-1 mb-4 w-xl hover:shadow-xl transition-shadow duration-300 border border-[var(--border)]">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-text">
          Workout {props.workout.getDate().toLocaleDateString()}
        </h2>
      </div>
    
      <div className="flex flex-col gap-3">
        {props.workout.exerciseBlocs.map((bloc) => (
          <div key={bloc.id} className="bg-[var(--bg)] p-3 rounded-md border-l-4 border-primary">
            <h3 className="font-semibold text-secondary">{bloc.title}</h3>
              <ul className="mt-1 text-[var(--text-muted)] text-sm list-disc list-inside">
                {bloc.sets.map((set) => (
                  <li key={set.id}>
                    <span className="font-medium text-text">{set.exercise.name}</span> {set.reps} reps @ {set.weight} kg
                    {set.comment && <span className="text-accent"> - "{set.comment}"</span>}
                  </li>
                ))}
              </ul>
          </div>
        ))}
      </div>
    </div>
  )
}