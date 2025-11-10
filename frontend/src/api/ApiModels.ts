export default class ApiModel {
  private static url = "http://localhost:3333/v1"

  public static async index(page: number = 1){

  }

  public static async show(page: number = 1){
    
  }
}

export interface ApiResponse<T> {
  elements: T,
  success: boolean,
  status: number,
  page?: number
}