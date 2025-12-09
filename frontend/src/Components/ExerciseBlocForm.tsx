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


export default function ExerciseBlocForm(props: PropsWithChildren<Props>){

  const form = useWorkoutForm()

  return (
      <div className="border border-text-muted p-3 rounded-(--radius) grid gap-3 bg-bg">
          <Label>Titre</Label>
          <Input type="text"></Input>
          <div className="grid gap-3">
              {props.exerciseBloc.sets.map((set) => (
                <div className="border border-text-muted p-3 rounded-(--radius) grip gap-3 bg-surface">
                  <Label>Nombre de rep</Label>
                  <Input type="number"
                  onChange={(e) => null}></Input>
                </div>
              ))}
            </div>
            <button type="button" className="bg-text text-surface inline-block px-2 py-2 rounded-radius my-3 border-none
            shadow-md transition-all duration-300 hover:bg-accent hover:shadow-lg hover:scale-101"
            onClick={() => form.addSet(props.index)}>Ajouter un set</button>
      </div>
  )
}