
import { AuthenticationContext } from "@/app/context/AuthContext"
import axios from "axios"
import { useContext } from "react"
import { deleteCookie } from "cookies-next";

export default function useAuth() {

    const {data, error, loading, setAuthState, url} = useContext(AuthenticationContext)

    const signIn = async (
        {email, password}:
        {email: string, password: string},
        handleClose: () => void
    ) => {
        try {
            setAuthState({
                data: null,
                loading: true,
                error: null,
                url
            })
            const response = await axios.post(`${url}/api/auth/signin`, {
                email,
                password
            })
            setAuthState({
                data: response.data,
                loading: false,
                error: null,
                url
            })
            handleClose()
        } catch (err: any) {
            setAuthState({
                data: null,
                loading: false,
                error: err.response.data.errorMessage,
                url
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
                    error: null,
                    url
                })
                const response = await axios.post(`${url}/api/auth/signup`, {
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
                    error: null,
                    url
                })
                handleClose()
            } catch (err: any) {
                setAuthState({
                    data: null,
                    loading: false,
                    error: err.response.data.errorMessage,
                    url
                })
            }
    }

    const signOut = () => {
        deleteCookie("jwt")
        console.log("Sign Out")
        setAuthState({
            data: null,
            loading: false,
            error: null,
            url
        })
    }

    return {signIn, signUp, signOut}
}