import Api from "../Api";
import Exercise from "../models/Exercise";
import ExerciseBloc from "../models/ExerciseBloc";
import Set from "../models/Set";
import Workout, { type WorkoutJSON } from "../models/Workout";
import type { ExerciseResponse } from "./ExerciseService";


export default class WorkoutService {
  public static async browse(page: number = 1): Promise<Workout[]> {
    const response = await Api.get<WorkoutResponse[]>('workouts', page)
    const workouts: Workout[] = response.body.map((workout: WorkoutResponse) =>
      new Workout(
        workout.date, 
        workout.exerciseBlocs.map((bloc) => new ExerciseBloc(
          bloc.title, 
          bloc.sets.map((set: any) => new Set(
            new Exercise(set.exercise.id, set.exercise.name, set.exercise.type), 
            set.reps, set.weight, set.tempo, set.comment, set.restTime
          ))
        )), 
        workout.id
      )
    )
    return workouts
  }

  public static async add(workout: Workout): Promise<Workout> {
    const body: WorkoutJSON = workout.toJSON()
    const response = await Api.post<WorkoutJSON, Workout>(body, 'workouts');
    return response.body
  }

  public static async delete(workoutId: number): Promise<string> {
    const res = await Api.delete<{ message: string }>(`workouts/${workoutId}`);
    return res.body.message;
  }

  public static async edit(workout: Workout): Promise<Workout> {
    const body: WorkoutJSON = workout.toJSON()
    const response = await Api.put<WorkoutJSON, Workout>(body, 'workouts/' + workout.id);
    return response.body
  }
}

interface WorkoutResponse {
  id: number
  date: string
  userId?: number
  exerciseBlocs: ExerciseBlocResponse[]
}

interface ExerciseBlocResponse {
  title: string
  sets: SetResponse[]
}

interface SetResponse {
  reps: number
  weight: number
  tempo: string
  exercise: ExerciseResponse
  comment: string
  restTime: number
}

interface addWorkoutBody {
  date: string
  exercise_blocs?: {
    title?: string
    sets?: {
      exercise_id: number
      reps: number
      weight: number
      comment: string
      restTime: number
      tempo?: string
    }[]
  }[]
}