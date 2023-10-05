"use client"

import axios from "axios"
import { getCookie } from "cookies-next";
import { User } from "@prisma/client";
import { useState, createContext, useEffect } from "react"

const url =  process.env.STATUS === "dev" ? "http://localhost:3000" : "https://zingy-empanada-6a5fca.netlify.app"

interface State {
    loading: boolean,
    data: User | null,
    error: string | null,
    url: string
}

interface AuthState extends State {
    setAuthState: React.Dispatch<React.SetStateAction<State>> 
}

export const AuthenticationContext = createContext<AuthState>({
    loading: false,
    data: null,
    error: null,
    setAuthState: () => {},
    url
});



export default function AuthContext({children}: {children: React.ReactNode;}) {
    const [authState, setAuthState] = useState<State>({
        loading: true,
        data: null,
        error: null,
        url,
    })

    const fetchUser = async () => {
        setAuthState({
            data: null,
            loading: true,
            error: null,
            url,
        })
        try {
            const jwt = getCookie("jwt")

            if(!jwt) {
                console.log("No JWT")
                return setAuthState({
                    data: null,
                    loading: false,
                    error: null,
                    url
                })
            }

            const response = await axios.get(`${url}/api/auth/me`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`

            setAuthState({
                data: response.data,
                loading: false,
                error: null,
                url
            })

        }catch (err: any) {
            console.log("ERROR")
            setAuthState({
                data: null,
                loading: false,
                error: err.response.data.errorMessage,
                url
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
