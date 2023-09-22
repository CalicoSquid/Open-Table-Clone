"use client"
import Link from "next/link"
import { useContext } from "react"
import Image from "next/image"
import logo from "../../public/logo.png"
import LoginModal from "./LoginModal"
import { AuthenticationContext } from "../context/AuthContext"
import useAuth from "@/hooks/useauth"

export default function Navbar() {

  const { data, loading } = useContext(AuthenticationContext)
  const { signOut } = useAuth()
  return (
    <nav className="bg-white p-2 flex justify-between items-center">
      <div className="flex">
        <Image src={logo} alt="logo" style={{height: "40px", width: "40px"}}/>
        <Link href="/" className="font-bold ml-2 text-gray-700 text-xxxl">OpenTable</Link>
      </div>
      <div>
        {loading ?
        <p></p> : 
        <div className="flex">
        {
          data ? 
          <button 
            className={`bg-blue-400 text-white border p-2 px-4 rounded mr-3`}
            onClick={signOut}
            >
            Logout
          </button> : 
          <>
            <LoginModal isSignIn={true} />
            <LoginModal isSignIn={false} />
          </>
        }
      </div>
        }
      </div>
    </nav>
  )
}
