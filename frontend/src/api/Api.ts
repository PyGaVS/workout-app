import type User from "./models/User"

export default class Api {
  public static url = "http://localhost:3333"

  public static async get<Obj>(route: string, page: number = 1): Promise<ApiResponse<Obj>> {
    const res = await this.fetchWithAuth(`${this.url}/${route}`, {
      method: "GET",
      mode: 'cors',
    })

    console.log(res)

    return Api.getResponse(res)
  }

  public static async post<Obj>(body: {[key: string]: string | number}, route: string): Promise<ApiResponse<Obj>>{
    const res = await Api.fetchWithAuth(`${this.url}/${route}`, {
            method: "POST",
            mode: 'cors',
            body: JSON.stringify(body),
        })
    
    return Api.getResponse(res)
  }

  private static fetchWithAuth(url: string, options: RequestInit): Promise<Response>{

    const isPublicRoute = () => [
      "/login",
      "/register",
      "/password/forgot"
    ].some(route => this.url + route == url);

    let token = sessionStorage.getItem('token')
    
    let headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': '*/*'
    }
    console.log(isPublicRoute(), token)
    if (!isPublicRoute() && token) {
      console.log('allo')
      headers.Authorization = `Bearer ${token}`;
    }

    console.log(options)

    options.headers = headers

    return fetch(url, options)
  }

  private static async getResponse<Obj>(response: Response): Promise<ApiResponse<Obj>>{
    const result = await response.json();
    const success: boolean = response.status == 200 || response.status == 201;

    return {
      body: success ? result : {},
      success: success,
      status: response.status,
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