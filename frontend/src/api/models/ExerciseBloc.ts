import type Exercise from "./Exercise"
import Set, { type SetJSON } from "./Set"

export default class ExerciseBloc {
    public id?: number
    public title: string
    public sets: Set[]
    public position?: number

    public constructor(title: string = "", sets: Set[] = [], position?: number, id?: number){
        this.id = id
        this.title = title
        this.sets = sets
    }

    public toJSON(): ExerciseBlocJSON{
        return { title: this.title, sets: this.sets.map((set) => set.toJSON()) }
    }

    public addSet(set?: Set){
        this.sets.push(
            set ? set : new Set()
        )

        return this
    }

    public setSets(sets: Set[]){
        this.sets = sets
        return this
    }
}

export interface ExerciseBlocJSON {
    title: string
    sets: SetJSON[]
}