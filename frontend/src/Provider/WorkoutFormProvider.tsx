import type Exercise from "@/api/models/Exercise";
import ExerciseBloc from "@/api/models/ExerciseBloc";
import type Set from "@/api/models/Set";
import Workout from "@/api/models/Workout";
import WorkoutService from "@/api/services/WorkoutService";
import React, { useState, createContext, useContext, useEffect } from "react";
import type { PropsWithChildren } from "react";

type WorkoutContextType = {
    workout: Workout;
    setWorkout: React.Dispatch<React.SetStateAction<Workout>>;
    setDate: (date: string) => void;
    addExerciseBloc: () => void;
    addSet: (blocIndex: number) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

interface Props {
    exercises: Exercise[]
}

export const WorkoutFormProvider = ({ children }: PropsWithChildren<{}>) => {
    const [workout, setWorkout] = useState<Workout>( new Workout( new Date().toLocaleDateString('en-CA') ) );

    const createWorkoutInstance = (
        date: string = workout.dateStr(),
        exerciseBlocs: ExerciseBloc[] = workout.exerciseBlocs
    ): Workout => {
        return new Workout(date, exerciseBlocs)
    }

    const setDate = (date: string) => {
        setWorkout(workout.setDate(date))
    }
    
    const addExerciseBloc = () => {
        setWorkout( createWorkoutInstance(undefined, [...workout.exerciseBlocs, new ExerciseBloc()]) )
    }

    

    const addSet = (blocIndex: number) => {
        const exerciseBlocs = workout.exerciseBlocs.map((bloc, i) => 
            i === blocIndex ? bloc.addSet() : bloc
        )
        setWorkout( createWorkoutInstance(undefined, exerciseBlocs) )
    }

    const updateSet = (blocIndex: number, setIndex: number, newSet: Set) => {
        const exerciseBlocs = workout.exerciseBlocs.map((bloc, i) => 
            i === blocIndex 
                ? bloc.setSets(bloc.sets.map((set, i) => i === setIndex ? newSet : set)) 
                : bloc
        )
        setWorkout( createWorkoutInstance(undefined, exerciseBlocs) )
    }

    const submit = () => {
        WorkoutService.add(workout)
    }

    return (
        <WorkoutContext.Provider value={{ workout, setWorkout, setDate, addExerciseBloc, addSet }}>
            {children}
        </WorkoutContext.Provider>
    )
}

export const useWorkoutForm = (): WorkoutContextType => {
    const ctx = useContext(WorkoutContext)
    if(!ctx) { throw new Error("useWorkout must be used inside a WorkoutFormProvider"); }
    return ctx
}