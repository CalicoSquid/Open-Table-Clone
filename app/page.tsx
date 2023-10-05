import { Inter } from "next/font/google"
import { Cuisine, Location, PRICE, Review, PrismaClient } from "@prisma/client";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
const inter = Inter({ subsets: ['latin'] })
import type { Metadata } from 'next'

const prisma = new PrismaClient();
 
export const metadata: Metadata = {
  title: 'OpenTable',
  description: '...',
}

export interface RestaurantCardType {
  id: number,
  name: string,
  main_image: string,
  cuisine: Cuisine,
  location: Location,
  price: PRICE
  reviews: Review[],
  slug: string,
}

const fetchRestaurants = async () => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      reviews: true,
      slug: true,
    }
  });

  return restaurants;
}


export default async function Home() {
  const restaurants = await fetchRestaurants()
  const cardArray = restaurants.map(restaurant => {
    return (
      <RestaurantCard restaurant={restaurant} />
    )
  })

  return (    
      <main>
        <Header />
        <div className="py-3 px-36 mt-10 flex flex-wrap ">
          {cardArray}
        </div>
      </main>
  )
}
