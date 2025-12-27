import Api from "../Api"
import Exercise from "../models/Exercise"

export default class ExerciseService {
  
  public static async browse(page: number = 1): Promise<Exercise[]> {
    const response = await Api.get<{ data: ExerciseResponse[] }>('exercises', page)
    return response.body.data.map(exercise => new Exercise(exercise.id, exercise.name, exercise.type))
  }
}

export interface ExerciseResponse {
  id: number;
  name: string;
  type: string;
}