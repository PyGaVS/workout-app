import User from "@/api/models/User";
import type AuthContextInterface from "@/types/AuthContext";
import { useState, createContext, useContext, useEffect } from "react";
import type { PropsWithChildren } from "react";

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

interface Props {}

export const AuthProvider = (props: PropsWithChildren<Props>) => {
    const [user, setUser] = useState<User>(new User(undefined, undefined, null));
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        User.whoami().then((user) => {
            setUser(new User(user?.fullName, user?.email, user?.authenticated, user?.isAdmin));
        })
    }, [])

    const login = (email: string, password: string) => {
        User.login({email, password}).then((r) => {
            if (r.error) {
                setErrorMessage(r.error ?? "Une erreur est survenue.")
            }
            setUser(r.user)
        })
    }

    const register = (email: string, password: string, confirmPassword: string, fullName: string, accessCode: string) => {
        if (password !== confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas.")
            return
        }

        User.register({email, password, fullName, accessCode}).then((r) => {
            if (r.error) {
                setErrorMessage(r.error ?? "Une erreur est survenue.")
            }
            setUser(r.user)
        })
    }

    const logout = () => {
        User.logout().then((success) => {
            if (success) {
                setUser( new User(undefined, undefined, false) );
            }
        })
    }

    return (
        <AuthContext.Provider
            value={{
                user: user,
                login: login,
                logout: logout,
                register: register,
                errorMessage: errorMessage
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if(!ctx) { throw new Error("useAuth must be used inside an AuthProvider"); }
    return ctx
}