
import { AuthenticationContext } from "@/app/context/AuthContext"
import axios from "axios"
import { useContext } from "react"
import { deleteCookie } from "cookies-next";

export default function useAuth() {

    const {data, error, loading, setAuthState} = useContext(AuthenticationContext)

    const signIn = async (
        {email, password}:
        {email: string, password: string},
        handleClose: () => void
    ) => {
        try {
            setAuthState({
                data: null,
                loading: true,
                error: null
            })
            const response = await axios.post("http://localhost:3000/api/auth/signin", {
                email,
                password
            })
            setAuthState({
                data: response.data,
                loading: false,
                error: null
            })
            handleClose()
        } catch (err: any) {
            setAuthState({
                data: null,
                loading: false,
                error: err.response.data.errorMessage
            })
        }
    }

    const signUp = async (
        {
            firstName, 
            lastName, 
            email, 
            password, 
            city, 
            phone 
        }: 
        {
            firstName: string, 
            lastName: string, 
            email: string, 
            password: string, 
            city: string, 
            phone: string
        },
        handleClose: () => void
        ) => {
            try {
                setAuthState({
                    data: null,
                    loading: true,
                    error: null
                })
                const response = await axios.post("http://localhost:3000/api/auth/signup", {
                    firstName,
                    lastName,
                    email,
                    password,
                    city,
                    phone
                })
                setAuthState({
                    data: response.data,
                    loading: false,
                    error: null
                })
                handleClose()
            } catch (err: any) {
                setAuthState({
                    data: null,
                    loading: false,
                    error: err.response.data.errorMessage
                })
            }
    }

    const signOut = () => {
        deleteCookie("jwt")
        console.log("Sign Out")
        setAuthState({
            data: null,
            loading: false,
            error: null
        })
    }

    return {signIn, signUp, signOut}
}