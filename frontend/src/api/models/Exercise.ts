import Api from "../Api"

export default class Exercise {
  private id: number
  public name: string
  public type: string


  public constructor(id: number, name: string = "Tractions", type: string = "poids du corps"){
      this.id = id
      this.name = name
      this.type = type
  }

  public getId(): number {
    return this.id
  }
}

export interface ExerciseForm {
  id?: number
}