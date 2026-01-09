import Api from "../Api"

export default class User {
    public fullName: string = ""
    public email: string = ""
    public authenticated: null | boolean = null //null = loading 
    

    public constructor(fullname?: string, email?: string, authenticated?: null | boolean){
        this.fullName = fullname || ""
        this.email = email || ""
        if(this.email && authenticated !== false){
            this.authenticated = true
        }
    }

    private save(){
        sessionStorage.setItem("fullName", this.fullName)
        sessionStorage.setItem("email", this.email)
        sessionStorage.setItem("auth", this.authenticated ? "true" : "false")
    }

    public static async login(credentials: {email: string, password: string}): Promise<{user: User, message: string}> {
        const res = await Api.post<{email: string, password: string}, {fullName: string, email: string, error: string}>(credentials, "auth/login")

        const user = new User()
        if(res.success){          
            user.fullName = res.body.fullName
            user.email = res.body.email
            user.authenticated = true
        }

        user.save()
        return {
            user: user,
            message: res.success ? "Login success" : res.errors[0]
        }
    }

    public static async whoami(): Promise<User | null>{
        const res = await Api.get<{user: User} | {}>("auth/me")
        if('user' in res.body){
            const user = new User(res.body.user.fullName, res.body.user.email, true)
            user.save()
            return user
        } else {
            return null
        }
    }

    public static async logout(): Promise<boolean>{
        const res = await Api.post<{}, unknown>({}, "auth/logout")
        if(res.success){
            sessionStorage.removeItem("fullName")
            sessionStorage.removeItem("email")
            sessionStorage.removeItem("auth")
        }
        return res.success;
    }
}