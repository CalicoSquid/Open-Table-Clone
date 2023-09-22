"use client"

import axios from "axios"
import { getCookie } from "cookies-next";
import { User } from "@prisma/client";
import { useState, createContext, useEffect } from "react"

interface State {
    loading: boolean,
    data: User | null,
    error: string | null
}

interface AuthState extends State {
    setAuthState: React.Dispatch<React.SetStateAction<State>> 
}

export const AuthenticationContext = createContext<AuthState>({
    loading: false,
    data: null,
    error: null,
    setAuthState: () => {}
});



export default function AuthContext({children}: {children: React.ReactNode;}) {
    const [authState, setAuthState] = useState<State>({
        loading: true,
        data: null,
        error: null,
    })

    const fetchUser = async () => {
        setAuthState({
            data: null,
            loading: true,
            error: null
        })
        try {
            const jwt = getCookie("jwt")

            if(!jwt) {
                console.log("No JWT")
                return setAuthState({
                    data: null,
                    loading: false,
                    error: null
                })
            }

            const response = await axios.get("http://localhost:3000/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`

            setAuthState({
                data: response.data,
                loading: false,
                error: null
            })

        }catch (err: any) {
            console.log("ERROR")
            setAuthState({
                data: null,
                loading: false,
                error: err.response.data.errorMessage
            })

        }
    }


    useEffect(() => {
        console.log("Checking")
        fetchUser()
    }, [])
   
  return (
    <AuthenticationContext.Provider value={{
        ...authState,
        setAuthState
    }}>
        {children}
    </AuthenticationContext.Provider>
  )
}
