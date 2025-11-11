import Api from "../Api"

export default class User {
    public fullName: string = ""
    public email: string = ""
    public status: "disconnected" | "loading" | "connected" = "disconnected"

    public async login(credentials: {email: string, password: string}): Promise<{user: User, message: string}> {
        const res = await Api.post<{user: User, token: string, error: string}>(credentials)

        const user = new User()
        if(res.success){          
            user.fullName = res.body.user.fullName
            user.email = res.body.user.email
            user.status = "connected"
        }

        return {
            user: user,
            message: res.success ? "Login success" : res.errors[0]
        }
    }
}