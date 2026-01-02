import type { ExerciseBlocJSON } from "./ExerciseBloc"
import type ExerciseBloc from "./ExerciseBloc"
import type User from "./User"

export default class Workout {
  public id: number
  public date: Date
  public user?: User
  public exerciseBlocs: ExerciseBloc[] = []

  public constructor(
    dateIso: string = new Date().toLocaleDateString('en-CA'), 
    exerciseBlocs: ExerciseBloc[] = [], 
    id: number,
    user?: User, 
  ){
    this.id = id
    this.user = user
    this.date = new Date(dateIso)
    this.exerciseBlocs = exerciseBlocs
  }

  public toJSON(): WorkoutJSON {
    return { date: this.dateStr(), exercise_blocs: this.exerciseBlocs.map((bloc) => bloc.toJSON()) }
  }

  public setExerciseBlocs(exerciseBlocs: ExerciseBloc[]): Workout {
    this.exerciseBlocs = exerciseBlocs
    return this
  }

  public getDate(): Date {
    return this.date
  }

  public dateStr(): string {
    return this.date.toLocaleDateString('en-CA')
  }

  public setDate(date: Date | string){
    if(date instanceof Date){
      this.date = date
    } else {
      this.date = new Date(date)
    }
    return this
  }

  public addSet(exerciseBlocIndex: number): Workout {
    this.setExerciseBlocs(
      this.exerciseBlocs.map((bloc, i) => 
        i === exerciseBlocIndex ? bloc.addSet() : bloc
      )
    )
    return this
  }
}

export interface WorkoutJSON {
  id?: number
  date: string
  exercise_blocs: ExerciseBlocJSON[]
}
