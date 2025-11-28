import Workout from "@/api/models/Workout";
import DrawerView from "@/Components/DrawerView";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

export default function AddWorkout() {

  return (
    <Dialog modal>
      <form>
        <DialogTrigger asChild>
          <button className="bg-secondary text-surface inline-block px-2 py-3 rounded-radius my-3 mx-6 border-none
            shadow-md transition-all duration-300 hover:bg-accent hover:shadow-lg hover:scale-105">
            <i className="fa-solid fa-dumbbell fa-xl pr-1" /> Save workout
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-5xl bg-surface">
          <DialogHeader>
            <DialogTitle>Add Workout</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}