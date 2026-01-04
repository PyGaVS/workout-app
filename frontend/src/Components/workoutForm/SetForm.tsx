import ExerciseBloc from "@/api/models/ExerciseBloc";
import { useState, type PropsWithChildren } from "react";
import { Input } from "../ui/input";
import type Exercise from "@/api/models/Exercise";
import { Label } from "../ui/label";
import { useWorkoutForm } from "@/Provider/WorkoutFormProvider";
import { Button } from "../ui/button";
import type Set from "@/api/models/Set";
import { buttonClasses } from "@/utils/styles";

interface Props {
  exerciseBloc: ExerciseBloc
  exerciseBlocIndex: number
  exercises: Exercise[]
  set: Set
  setIndex: number
}


export default function SetForm({ exerciseBloc, exerciseBlocIndex, exercises, set, setIndex } : PropsWithChildren<Props>){

  const form = useWorkoutForm()

  return (
    <div className="border border-text-muted p-3 rounded-(--radius) grid gap-1 bg-surface">
      <Label>Nombre de rep</Label>
      <Input type="number"
        onChange={(e) => form.updateSet(exerciseBlocIndex, setIndex, set.setReps(e.target.valueAsNumber))}
        value={exerciseBloc.sets[setIndex].reps}></Input>
      <Label>Poids (en kg)</Label>
      <Input type="number"
        onChange={(e) => form.updateSet(exerciseBlocIndex, setIndex, set.setWeight(e.target.valueAsNumber))}
        value={exerciseBloc.sets[setIndex].weight}></Input>
      <Label>Temps de repos (en secondes)</Label>
      <Input type="number"
        onChange={(e) => form.updateSet(exerciseBlocIndex, setIndex, set.setRestTime(e.target.valueAsNumber))}
        value={exerciseBloc.sets[setIndex].restTime}></Input>
      <Label>Commentaire</Label>
      <Input type="text"
        onChange={(e) => form.updateSet(exerciseBlocIndex, setIndex, set.setComment(e.target.value))}
        value={exerciseBloc.sets[setIndex].comment}></Input>
      <Label>Tempo</Label>
      <Input type="text"
        onChange={(e) => form.updateSet(exerciseBlocIndex, setIndex, set.setTempo(e.target.value))}
        value={exerciseBloc.sets[setIndex].tempo}></Input>
      <Label>Exercice</Label>
      <select className="p-2 border border-border rounded-radius bg-surface z-50 w-full"
        onChange={(e) => {
          const selectedExercise = exercises.find(ex => ex.getId() === parseInt(e.target.value))
          if (selectedExercise) {
            form.updateSet(exerciseBlocIndex, setIndex, set.setExercise(selectedExercise))
          }
        }}>
          {exercises.map((exercise) => (
            <option key={exercise.getId()} value={exercise.getId()}
              selected={exercise.getId() === set.exercise.getId()}>
              {exercise.name}
            </option>
          ))}
        </select>
        <div className="flex gap-2 justify-end">
          <Button type="button" onClick={() => form.duplicateSet(exerciseBlocIndex, setIndex)} className={`${buttonClasses} w-1/5`}>
            <i className="fa-solid fa-clone" />
          </Button>
          <Button type="button" onClick={() => form.removeSet(exerciseBlocIndex, setIndex)} className={`${buttonClasses} w-1/5 bg-error hover:bg-error hover:brightness-110`}>
            <i className="fa-solid fa-trash"></i>
          </Button>
        </div>
        
    </div>
  )
}