import User from "@/api/models/User";
import type AuthContextInterface from "@/types/AuthContext";
import React, { useState, createContext, useContext } from "react";
import type { PropsWithChildren } from "react";

const AuthContext = createContext<AuthContextInterface>({user: new User()});

interface Props {
  children: React.ReactNode
}

export const AuthProvider = (props: PropsWithChildren<Props>) => {
    const [user, setUser] = useState<User>(new User());

    return (
        <AuthContext.Provider
            value={{
                user: user
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)