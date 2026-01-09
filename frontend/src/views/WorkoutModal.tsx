import Workout from "@/api/models/Workout";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/Components/ui/dialog";
import WorkoutFormContent from "@/Components/workoutForm/WorkoutFormContent";
import { useWorkoutForm } from "@/Provider/WorkoutFormProvider";
import { useEffect, useState, type PropsWithChildren } from "react";

interface Props {
  children: React.ReactNode
  workout?: Workout
}

export default function WorkoutModal(props: PropsWithChildren<Props>){

  const [open, setOpen] = useState(false);
  const form = useWorkoutForm();

  const onOpen = () => {
    if(!open){
      form.setWorkout(new Workout( new Date().toLocaleDateString('en-CA'), [], 0 ));
    }
    setOpen(!open);
  }
  
  return (
    <Dialog modal open={open} onOpenChange={onOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <WorkoutFormContent workout={props.workout} setOpen={setOpen} />
    </Dialog>
  )
}