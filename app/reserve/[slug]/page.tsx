import Header from "../components/Header";
import Form from "../components/Form";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Reserve | OpenTable',
  description: '...',
}

export default function Reservations() {
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header />
        <Form />
      </div>
    </div>
  )
}
