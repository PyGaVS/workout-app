import Api from "../Api"
import type Exercise from "../models/Exercise"

export default class ExerciseService {
  
  public static async browse(page: number = 1): Promise<Exercise[]> {
    const response = await Api.get<Exercise[]>('exercises', page)
    return response.body as Exercise[]
  }
}