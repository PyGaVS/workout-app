
export default class Exercise {
    private id: number
    public name: string
    public type: string


    public constructor(id: number, name: string, type: string){
        this.id = id
        this.name = name
        this.type = type
    }
}