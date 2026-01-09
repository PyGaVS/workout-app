import User from "@/api/models/User";
import type AuthContextInterface from "@/types/AuthContext";
import { useState, createContext, useContext, useEffect } from "react";
import type { PropsWithChildren } from "react";

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

interface Props {}

export const AuthProvider = (props: PropsWithChildren<Props>) => {
    const [user, setUser] = useState<User>(new User());

    useEffect(() => {
        User.whoami().then((user) => {
            setUser(new User(user?.fullName, user?.email, user ? true : false))
        })
    }, [])

    const login = (email: string, password: string) => {
        User.login({email, password}).then((r) => {
            setUser(r.user)
        })
    }

    const logout = () => {
        User.logout().then((success) => {
            if (success) {
                setUser(new User());
            }
        })
    }

    return (
        <AuthContext.Provider
            value={{
                user: user,
                login: login,
                logout: logout
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