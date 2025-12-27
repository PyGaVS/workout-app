import Workout from "@/api/models/Workout";
import ExerciseBlocForm from "@/Components/ExerciseBlocForm";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useWorkoutForm } from "@/Provider/WorkoutFormProvider";
import { buttonClasses } from "@/utils/styles";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState, type PropsWithChildren } from "react";

interface Props {
  children: React.ReactNode
  edit?: boolean
  workout?: Workout
}

export default function WorkoutModal(props: PropsWithChildren<Props>){

  const [open, setOpen] = useState(false);
  const form = useWorkoutForm();

  useEffect(() => {
    if(props.workout){
      form.setWorkout(props.workout);
    }
    setOpen(false)
  }, []);
  
  function handleSubmit(e: React.FormEvent){
    //e.preventDefault();
    form.submit();
    setOpen(false)
  }

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
        <DialogContent className="sm:max-w-5xl bg-surface max-h-full overflow-y-scroll">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add Workout</DialogTitle>
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
    </Dialog>
  )
}