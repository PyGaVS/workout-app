import type Workout from '@/api/models/Workout'
import { useState, type PropsWithChildren } from 'react'
import { ContextMenuContent, ContextMenuItem } from './ui/context-menu'
import WorkoutModal from '@/views/WorkoutModal'
import WorkoutService from '@/api/services/WorkoutService'
import { Dialog, DialogTrigger } from './ui/dialog'
import WorkoutFormContent from './workoutForm/WorkoutFormContent'

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
          <ContextMenuItem>
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