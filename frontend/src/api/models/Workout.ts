import Api from "../Api"
import type User from "./User"

export default class Workout {
    private id: number
    private date: Date
    private user?: User

    public constructor(id: number, dateIso: string, user?: User){
        this.id = id
        this.user = user
        this.date = new Date(dateIso)
    }

    public static async browse(page: number = 1): Promise<Workout[]> {
        const response = await Api.get<WorkoutResponse[]>('workouts', page)
        let workouts: Workout[] = [];
        response.body.map((workout: WorkoutResponse) => {
            workouts.push(new Workout(workout.id, workout.date))
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