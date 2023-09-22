"use client"
import err from "../../public/icons/icons/error.png"

import Image from "next/image"

export default function NotFound({error}: {error: Error}) {
  return (
    <div className="h-screen bg-gray-200 flex flex-col items-center justify-center">
        <Image src={err} alt="error" className="w-56 mb-8"/>
        <div className="bg-white px-9 py-14 shadow rounded">
            <h3 className="text-xxxl font-bold">
            Well this is embarrassing...
            </h3>
            <p className="text-reg font-bold">We cant seem to find that restaurant</p>
            <p className="mt-6 font-light text-sm">Error code: 404</p>
        </div>
    </div>
  )
}
