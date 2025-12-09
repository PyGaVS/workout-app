import Api from "../Api";
import Workout, { type WorkoutJSON } from "../models/Workout";


export default class WorkoutService {
  public static async browse(page: number = 1): Promise<Workout[]> {
    const response = await Api.get<WorkoutResponse[]>('workouts', page)
    let workouts: Workout[] = [];
    response.body.map((workout: WorkoutResponse) => {
      workouts.push(new Workout(workout.date, workout.exerciseBlocs, undefined, workout.id))
    })
    return workouts
  }

  public static async add(workout: Workout): Promise<Workout> {
    const body: WorkoutJSON = workout.toJSON()
    const response = await Api.post<WorkoutJSON, Workout>(body, 'workouts');
    return response.body
  }
}

interface WorkoutResponse {
  id: number;
  date: string;
  userId?: number;
  exerciseBlocs: []
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