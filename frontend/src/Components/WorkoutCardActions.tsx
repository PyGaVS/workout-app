import type Workout from '@/api/models/Workout'
import { type PropsWithChildren } from 'react'
import { ContextMenuContent, ContextMenuItem } from './ui/context-menu'
import WorkoutService from '@/api/services/WorkoutService'
import { DialogTrigger } from './ui/dialog'

interface Props {
  workout: Workout
  refresh: () => void
}

export default function WorkoutCardActions({ workout, refresh }: PropsWithChildren<Props>){

  const onDelete = () => {
    WorkoutService.delete(workout.id).then( () => refresh() )
  }

  return (
      <ContextMenuContent className='bg-surface border-border'>
        <DialogTrigger asChild>
          <ContextMenuItem className='data-highlighted:bg-accent data-highlighted:text-surface'>
            <div><i className="fa-solid fa-pen-to-square"></i> Modifier</div>
          </ContextMenuItem>
        </DialogTrigger>
        <ContextMenuItem className='text-error data-highlighted:bg-error data-highlighted:text-surface' 
        onClick={onDelete}>
          <i className="fa-solid fa-trash"></i> Supprimer
        </ContextMenuItem>
      </ContextMenuContent>
  )
}