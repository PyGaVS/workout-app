import Api from "../Api"
import type ExerciseBloc from "./ExerciseBloc"
import type User from "./User"

export default class Workout {
    private id: number
    private date: Date
    private user?: User
    public exerciseBlocs: ExerciseBloc[] = []

    public constructor(id: number, dateIso: string, exerciseBlocs: ExerciseBloc[] = [], user?: User){
        this.id = id
        this.user = user
        this.date = new Date(dateIso)
        this.exerciseBlocs = exerciseBlocs
    }

    public static async browse(page: number = 1): Promise<Workout[]> {
        const response = await Api.get<WorkoutResponse[]>('workouts', page)
        let workouts: Workout[] = [];
        response.body.map((workout: WorkoutResponse) => {
            workouts.push(new Workout(workout.id, workout.date, workout.exerciseBlocs))
        })
        return workouts
    }

    public getDate(){
        return this.date
    }

    public getDateString(): string {
        return this.date.toUTCString()
    }
}

interface WorkoutResponse {
    id: number;
    date: string;
    userId: number;
    exerciseBlocs: []
}