import User from "@/api/models/User";

export default interface AuthContext {
    user: User,
    login: (email: string, password: string) => void,
    logout: () => void,
    register: (email: string, password: string, confirmPassword: string, fullName: string, accessCode: string) => void,
    errorMessage: string
}