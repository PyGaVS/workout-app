export default class User {
    public fullName: string = ""
    public email: string = ""
    public status: "disconnected" | "loading" | "connected" = "disconnected"
}