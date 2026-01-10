import Api from "../Api"

export default class User {
    public fullName: string = ""
    public email: string = ""
    public authenticated: null | boolean = null //null = loading 
    public isAdmin: boolean = false
    

    public constructor(fullname?: string, email?: string, authenticated?: null | boolean, isAdmin?: boolean) {
        this.fullName = fullname || ""
        this.email = email || ""
        this.authenticated = this.email ? authenticated || null : false
        this.isAdmin = isAdmin || false
    }

    public static async login(credentials: {email: string, password: string}): Promise<{user: User, error: string}> {
        const res = await Api.post<{email: string, password: string}, {fullName?: string, email?: string, isAdmin?: boolean}>(credentials, "auth/login")
        const user = new User(res.body.fullName, res.body.email, true, res.body.isAdmin)

        return {
            user: user,
            error: !res.success ? res.error : ""
        }
    }

    public static async register(data: {fullName: string, email: string, password: string, accessCode: string}): Promise<{user: User, error: string}> {
        const res = await Api.post<
            {fullName: string, email: string, password: string, accessCode: string}, {fullName?: string, email?: string}
        >(data, "auth/register")

        const user = new User(res.body.fullName, res.body.email, true)

        return {
            user: user,
            error: !res.success ? res.error : ""
        }
    }

    public static async whoami(): Promise<User | null>{
        const res = await Api.get<{user: User} | {}>("auth/me")
        if('user' in res.body){
            const user = new User(res.body.user.fullName, res.body.user.email, true, res.body.user.isAdmin)
            return user
        } else {
            const user = new User()
            user.authenticated = false
            return user
        }
    }

    public static async logout(): Promise<boolean>{
        const res = await Api.post<{}, unknown>({}, "auth/logout")
        return res.success || res.status == 401;
    }
}