import User from "@/api/models/User";
import type AuthContextInterface from "@/types/AuthContext";
import React, { useState, createContext, useContext, useEffect } from "react";
import type { PropsWithChildren } from "react";

const AuthContext = createContext<AuthContextInterface>({user: new User()});

interface Props {}

export const AuthProvider = (props: PropsWithChildren<Props>) => {
    const [user, setUser] = useState<User>(new User());

    const login = (email: string, password: string) => {
        User.login({email, password}).then((r) => {
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