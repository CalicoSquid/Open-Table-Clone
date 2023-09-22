import Header from "./components/Header";
import type { Metadata } from 'next'
 
export let metadata: Metadata = {
  title: '',
  description: '...',
}


export default function RestaurantLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: {slug: string}
  }) {
  const name = params.slug  
  metadata.title = `${name} | Opentable`
  return (
    <main>
        <Header name={name}/>
        <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
            {children}
        </div>
    </main>
    
  )
}
