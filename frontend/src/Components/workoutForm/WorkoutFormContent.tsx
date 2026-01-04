import Workout from "@/api/models/Workout";
import ExerciseBlocForm from "@/Components/workoutForm/ExerciseBlocForm";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useWorkoutForm } from "@/Provider/WorkoutFormProvider";
import { buttonClasses } from "@/utils/styles";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState, type PropsWithChildren } from "react";

interface Props {
  workout?: Workout
  setOpen: (open: boolean) => void
  edit?: boolean
}

export default function WorkoutFormContent(props: PropsWithChildren<Props>){

  const form = useWorkoutForm();

  function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    form.submit(props.edit);
    props.setOpen(false)
  }

  return (
    <DialogContent className="sm:max-w-5xl bg-surface max-h-full overflow-y-scroll">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>{props.edit ? "Modifier le workout" : "Ajouter un workout"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" 
              onChange={(e) => form.setDate(e.target.value)} 
              value={form.workout.dateStr()} />
          </div>
          <div className="grid gap-3">
            {form.workout.exerciseBlocs.map((ex, i) => 
              <ExerciseBlocForm exerciseBloc={ex} index={i} exercises={form.exercises} />
            )}
          </div>
          <button type="button" className={buttonClasses}
          onClick={() => form.addExerciseBloc()}>Ajouter des exercices</button>
        </div>
        <DialogFooter>
          <Button type="submit" className="hover:bg-accent bg-text text-surface hover:rotate-2">Save workout</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}