import ExerciseBloc from "@/api/models/ExerciseBloc";
import { type PropsWithChildren } from "react";
import { Input } from "./ui/input";
import type Exercise from "@/api/models/Exercise";
import { Label } from "./ui/label";
import { useWorkoutForm } from "@/Provider/WorkoutFormProvider";
import { Button } from "./ui/button";
import SetForm from "./SetForm";
import { buttonClasses } from "@/utils/styles";

interface Props {
  exerciseBloc: ExerciseBloc
  exercises: Exercise[]
  index: number
}


export default function ExerciseBlocForm({ exerciseBloc, exercises, index } : PropsWithChildren<Props>){

  const form = useWorkoutForm()

  return (
      <div className="border border-text-muted p-3 rounded-(--radius) grid gap-3 bg-bg">
          <Label>Titre</Label>
          <Input type="text"
            onChange={(e) => form.updateExerciseBloc(index, exerciseBloc.setTitle(e.target.value))}
            value={exerciseBloc.title} />
          <div className="flex flex-col md:flex-row flex-wrap justify-start gap-3">
              {exerciseBloc.sets.map((set, setIndex) => (
                <SetForm exerciseBloc={exerciseBloc} exerciseBlocIndex={index} exercises={exercises} set={set} setIndex={setIndex} />
              ))}
            </div>
            <button type="button" className={buttonClasses}
            onClick={() => form.addSet(index)}>Ajouter une série</button>
      </div>
  )
}