import Workout from "@/api/models/Workout";
import DrawerView from "@/Components/DrawerView";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import { useEffect, useState } from "react";

export default function AddWorkout() {

  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <button className="bg-secondary text-[var(--surface)] inline-block px-2 py-3 rounded-[var(--radius)] my-3 mx-6 border-none
          shadow-md transition-all duration-300 hover:bg-[var(--accent)] hover:shadow-lg hover:scale-105">
          <i className="fa-solid fa-dumbbell fa-xl pr-1" /> Save workout
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl bg-[var(--surface)]">
        azdefergvd
      </DialogContent>
    </Dialog>
  )
}