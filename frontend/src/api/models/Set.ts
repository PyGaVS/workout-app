import Exercise, { type ExerciseForm } from "./Exercise"

export default class Set {
    public id?: number
    public reps: number
    public weight: number
    public tempo: string
    public exercise: Exercise
    public comment: string
    public restTime: number


    public constructor(
        exercise: Exercise = new Exercise(1), 
        reps: number = 8,
        weight: number = 0,
        tempo: string = "",
        comment: string = "",
        restTime: number = 120,
        id?: number
    ){
        this.id = id
        this.reps = reps
        this.weight = weight
        this.tempo = tempo
        this.exercise = exercise
        this.comment = comment
        this.restTime = restTime
    }

    public toJSON(): SetJSON {
        const { reps, weight, comment, restTime, tempo } = this;
        return {
            exercise_id: this.exercise.getId(),
            reps, weight, comment, restTime, tempo
        }
    }

    setReps(reps: number){
        this.reps = reps
        return this
    }

    setWeight(weight: number){
        this.weight = weight
        return this
    }

    setExercise(exercise: Exercise){
        this.exercise = exercise
        return this
    }

    setComment(comment: string){
        this.comment = comment
        return this
    }

    setRestTime(restTime: number){
        this.restTime = restTime
        return this
    }

    setTempo(tempo: string){
        this.tempo = tempo
        return this
    }

    clone(): Set {
        return new Set(this.exercise, this.reps, this.weight, this.tempo, this.comment, this.restTime)
    }
}

export interface SetJSON {
    exercise_id: number
    reps: number
    weight: number
    comment: string
    restTime: number
    tempo: string
}