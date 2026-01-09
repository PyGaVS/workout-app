import User from "@/api/models/User";

export default interface AuthContext {
    user: User,
    login?: (email: string, password: string) => void,
    logout?: () => void
}