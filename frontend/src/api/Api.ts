export default class Api {
  public static url = "http://localhost:3333"

  public static async get<Obj>(route: string, page: number = 1): Promise<ApiResponse<Obj>> {
    const res = await this.fetchWithAuth(`${this.url}/${route}`, {
      method: "GET",
      credentials: 'include',
      mode: 'cors',
    })

    return Api.getResponse(res)
  }

  public static async post<Body, Obj>(body: Body, route: string): Promise<ApiResponse<Obj>>{
    const res = await Api.fetchWithAuth(`${this.url}/${route}`, {
      method: "POST",
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(body),
    })
    
    return Api.getResponse(res)
  }

  public static async delete<Obj>(route: string): Promise<ApiResponse<Obj>>{
    const res = await Api.fetchWithAuth(`${this.url}/${route}`, {
      method: "DELETE",
      credentials: 'include',
      mode: 'cors',
    })
    
    return Api.getResponse(res)
  }

  public static async put<Body, Obj>(body: Body, route: string): Promise<ApiResponse<Obj>>{
    const res = await Api.fetchWithAuth(`${this.url}/${route}`, {
      method: "PUT",
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(body),
    })
    
    return Api.getResponse(res)
  }

  private static fetchWithAuth(url: string, options: RequestInit): Promise<Response>{

    const isPublicRoute = () => [
      "/login",
      "/register"
    ].some(route => this.url + route == url);

    let token = sessionStorage.getItem('token')
    
    let headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': '*/*'
    }

    if (!isPublicRoute() && token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
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
      error: Api.catchError(result),
    }
  }

  private static catchError(result: any): string {
    if(result.errors){
      return result.errors[0].message
    } else if(result.message){
      return result.message
    } else {
      return ""
    }
  }
}

export interface ApiResponse<T> {
  body: T,
  success: boolean,
  status: number,
  error: string,
  page?: number
}