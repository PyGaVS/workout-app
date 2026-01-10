import type User from "./User"

export default class AccessCode {
    private id?: number
    public code: string
    public memberFirstName: string
    public memberLastName: string
    public user: User | null

    public constructor(code: string, memberFirstName: string, memberLastName: string, user: User | null = null, id?: number){
        this.id = id
        this.code = code
        this.memberFirstName = memberFirstName
        this.memberLastName = memberLastName
        this.user = user
    }
}