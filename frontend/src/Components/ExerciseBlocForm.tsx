import ExerciseBloc from "@/api/models/ExerciseBloc";
import { useState, type Dispatch, type PropsWithChildren, type SetStateAction } from "react";
import { Input } from "./ui/input";
import type Exercise from "@/api/models/Exercise";
import { Label } from "./ui/label";
import { useWorkoutForm } from "@/Provider/WorkoutFormProvider";

interface Props {
  exerciseBloc: ExerciseBloc
  exercises: Exercise[]
  index: number
}


export default function ExerciseBlocForm({ exerciseBloc, exercises, index } : PropsWithChildren<Props>){

  const form = useWorkoutForm()
  console.log(exercises)

  return (
      <div className="border border-text-muted p-3 rounded-(--radius) grid gap-3 bg-bg">
          <Label>Titre</Label>
          <Input type="text"
            onChange={(e) => form.updateExerciseBloc(index, exerciseBloc.setTitle(e.target.value))}
            value={exerciseBloc.title} />
          <div className="grid gap-3">
              {exerciseBloc.sets.map((set, setIndex) => (
                <div className="border border-text-muted p-3 rounded-(--radius) grip gap-3 bg-surface">
                  <Label>Nombre de rep</Label>
                  <Input type="number"
                    onChange={(e) => form.updateSet(index, setIndex, set.setReps(e.target.valueAsNumber))}></Input>
                  <Label>Poids (en kg)</Label>
                  <Input type="number"
                    onChange={(e) => form.updateSet(index, setIndex, set.setWeight(e.target.valueAsNumber))}></Input>
                  <Label>Temps de repos (en secondes)</Label>
                  <Input type="number"
                    onChange={(e) => form.updateSet(index, setIndex, set.setRestTime(e.target.valueAsNumber))}></Input>
                  <Label>Commentaire</Label>
                  <Input type="text"
                    onChange={(e) => form.updateSet(index, setIndex, set.setComment(e.target.value))}></Input>
                  <Label>Tempo</Label>
                  <Input type="text"
                    onChange={(e) => form.updateSet(index, setIndex, set.setTempo(e.target.value))}></Input>
                  <Label>Exercice</Label>
                  <select className="p-2 border border-border rounded-radius bg-surface z-50 w-full"
                    onChange={(e) => {
                      const selectedExercise = exercises.find(ex => ex.getId() === parseInt(e.target.value))
                      if (selectedExercise) {
                        form.updateSet(index, setIndex, set.setExercise(selectedExercise))
                      }
                    }}>
                      {exercises.map((exercise) => (
                        <option key={exercise.getId()} value={exercise.getId()}
                          selected={exercise.getId() === set.exercise.getId()}>
                          {exercise.name}
                        </option>
                      ))}
                    </select>
                </div>
              ))}
            </div>
            <button type="button" className="bg-text text-surface inline-block px-2 py-2 rounded-radius my-3 border-none
            shadow-md transition-all duration-300 hover:bg-accent hover:shadow-lg hover:scale-101"
            onClick={() => form.addSet(index)}>Ajouter un set</button>
      </div>
  )
}