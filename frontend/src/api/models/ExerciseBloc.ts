import type Set from "./Set"

export default class ExerciseBloc {
    private id: number
    public title: string
    public sets: Set[]

    public constructor(id: number, title: string, sets: Set[]){
        this.id = id
        this.title = title
        this.sets = sets
    }
}