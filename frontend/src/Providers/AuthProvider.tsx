import User from "@/api/models/User";
import type AuthContextInterface from "@/types/AuthContext";
import React, { useState, createContext, useContext, useEffect } from "react";
import type { PropsWithChildren } from "react";

const AuthContext = createContext<AuthContextInterface>({user: new User()});

interface Props {
    children: React.ReactNode
}

export const AuthProvider = (props: PropsWithChildren<Props>) => {
    const [user, setUser] = useState<User>(new User());

    useEffect(() => {
        console.log("AuthProvider mounted ✅");
        return () => console.log("AuthProvider unmounted ❌");
    }, []);

    const login = (email: string, password: string) => {
        user.login({email, password}).then((r) => {
            console.log(r.user)
            setUser(r.user)
        })
    }

    return (
        <AuthContext.Provider
            value={{
                user: user,
                login: login
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)