import Api from "../Api"

type AuthStatus = "disconnected" | "loading" | "connected"

export default class User {
    public fullName: string = ""
    public email: string = ""
    public status: AuthStatus = "disconnected"

    public constructor(){
        this.fullName = localStorage.getItem("fullName") || ""
        this.email = localStorage.getItem("email") || ""
        this.status = this.getStoredStatus()
    }

    private getStoredStatus(): AuthStatus {
        const storedStatus = localStorage.getItem("status")

        if(["disconnected", "loading", "connected"].includes(storedStatus || "")){

            return storedStatus as AuthStatus || "disconnected"
        }

        return "disconnected"
    }

    private save(){
        localStorage.setItem("fullName", this.fullName)
        localStorage.setItem("email", this.email)
        localStorage.setItem("status", this.status)
    }

    public static async login(credentials: {email: string, password: string}): Promise<{user: User, message: string}> {
        const res = await Api.post<{user: User, token: string, error: string}>(credentials, "auth/login")

        const user = new User()
        if(res.success){          
            user.fullName = res.body.user.fullName
            user.email = res.body.user.email
            user.status = "connected"
        }

        sessionStorage.setItem('token', res.body.token)

        user.save()
        return {
            user: user,
            message: res.success ? "Login success" : res.errors[0]
        }
    }
}