import type User from "./models/User"

export default class Api {
  public static url = "http://localhost:3333/v1"

  public static async index(page: number = 1){

  }

  public static async show(page: number = 1){
    
  }

  public static async post<Obj>(body: {[key: string]: string | number}): Promise<ApiResponse<Obj>>{
    const res = await fetch(`${this.url}/auth/login`, {
            method: "POST",
            mode: 'cors',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        })
    
    const result = await res.json()
    const success: boolean = res.status == 200 || res.status == 201

    return {
      body: success ? result : {},
      success: success,
      status: res.status,
      errors: !success ? [...result.errors] : []
    }
  }
}

export interface ApiResponse<T> {
  body: T,
  success: boolean,
  status: number,
  errors: any[],
  page?: number
}