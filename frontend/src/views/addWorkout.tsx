import Workout from "@/api/models/Workout";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";

export default function AddWorkout() {

  const [date, setDate] = useState<string>(new Date().toLocaleDateString('en-CA'));
  const [open, setOpen] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    Workout.add({ date: date })

    setOpen(false)
  }

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-text text-surface inline-block px-2 py-3 rounded-radius my-3 mx-6 border-none
          shadow-md transition-all duration-300 hover:bg-accent hover:shadow-lg hover:scale-105">
          <i className="fa-solid fa-dumbbell fa-xl pr-1" /> Save workout
        </button>
      </DialogTrigger>
        <DialogContent className="sm:max-w-5xl bg-surface">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add Workout</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" onChange={(e) => setDate(e.target.value)} value={date}/>
              </div>
            </div>
            <DialogFooter className="">
              <Button type="submit" className="hover:bg-accent bg-text text-surface hover:rotate-2">Save workout</Button>
            </DialogFooter>
          </form>
        </DialogContent>
    </Dialog>
  )
}