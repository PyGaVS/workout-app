import type Exercise from "@/api/models/Exercise";
import ExerciseBloc from "@/api/models/ExerciseBloc";
import type Set from "@/api/models/Set";
import Workout from "@/api/models/Workout";
import WorkoutService from "@/api/services/WorkoutService";
import React, { useState, createContext, useContext, useEffect } from "react";
import type { PropsWithChildren } from "react";

type WorkoutContextType = {
    workout: Workout;
    exercises: Exercise[];
    setWorkout: React.Dispatch<React.SetStateAction<Workout>>;
    setDate: (date: string) => void;
    addExerciseBloc: () => void;
    updateExerciseBloc: (blocIndex: number, newBloc: ExerciseBloc) => void;
    addSet: (blocIndex: number) => void;
    updateSet: (blocIndex: number, setIndex: number, newSet: Set) => void;
    submit: () => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

interface Props {
    exercises: Exercise[]
}

export const WorkoutFormProvider = ({ children, exercises }: PropsWithChildren<Props>) => {
    const [workout, setWorkout] = useState<Workout>( new Workout( new Date().toLocaleDateString('en-CA') ) );

    const createWorkoutInstance = (
        date: string = workout.dateStr(),
        exerciseBlocs: ExerciseBloc[] = workout.exerciseBlocs
    ): Workout => {
        return new Workout(date, exerciseBlocs)
    }

    const setDate = (date: string) => {
        setWorkout( createWorkoutInstance(workout.setDate(date).dateStr()) )
    }

    const addExerciseBloc = () => {
        setWorkout( createWorkoutInstance(undefined, [...workout.exerciseBlocs, new ExerciseBloc()]) )
    }

    const updateExerciseBloc =(blocIndex: number, newBloc: ExerciseBloc) => {
        const exerciseBlocs = workout.exerciseBlocs.map((bloc, i) =>
            i === blocIndex ? newBloc : bloc
        )
        setWorkout( createWorkoutInstance(undefined, exerciseBlocs) )
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
        <WorkoutContext.Provider value={{ 
            workout, exercises: exercises, 
            setWorkout, setDate, 
            addExerciseBloc, updateExerciseBloc,
            addSet, updateSet, 
            submit 
        }}>
            {children}
        </WorkoutContext.Provider>
    )
}

export const useWorkoutForm = (): WorkoutContextType => {
    const ctx = useContext(WorkoutContext)
    if(!ctx) { throw new Error("useWorkout must be used inside a WorkoutFormProvider"); }
    return ctx
}