import type Exercise from "./Exercise"

export default class Set {
    private id: number
    public reps: number
    public weight: number
    public tempo: string
    public exercise: Exercise


    public constructor(id: number, reps: number, weight: number, tempo: string, exercise: Exercise){
        this.id = id
        this.reps = reps
        this.weight = weight
        this.tempo = tempo
        this.exercise = exercise
    }
}