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

    public addSet(set?: Set): ExerciseBloc{
        this.sets.push(
            set ? set : new Set()
        )

        return this
    }

    public duplicateSet(setIndex: number): ExerciseBloc {
        this.sets.splice(setIndex+1, 0, this.sets[setIndex].clone())
        return this
    }

    public removeSet(setIndex: number): ExerciseBloc {
        this.sets.splice(setIndex, 1)
        return this
    }

    public setSets(sets: Set[]){
        return new ExerciseBloc(this.title, sets, this.position, this.id)
    }

    public setTitle(title: string){
        this.title = title
        return this
    }

    public getSetsWithMultiplier(): Set[] {
        let prevSet: Set | null = null;
        let sets: Set[] = [];
        let current: Set | null = null;

        for (const set of this.sets) {
            current = set.clone();
            if ((prevSet ? current.equals(prevSet) : false) && prevSet) {
                current.multiply = prevSet.multiply + 1;
            } else {
                sets.push(prevSet as Set);
            }
            prevSet = current;
        }
        if(current) sets.push(current);
        return sets.filter(set => set !== null);
    }
}

export interface ExerciseBlocJSON {
    title: string
    sets: SetJSON[]
}