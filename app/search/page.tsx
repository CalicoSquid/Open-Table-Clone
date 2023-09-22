
import Header from "./components/Header"
import RestaurantCard from "./components/RestaurantCard"
import SearchSidebar from "./components/SearchSidebar"
import type { Metadata } from 'next'
import {PRICE, PrismaClient } from "@prisma/client"
 
export const metadata: Metadata = {
  title: 'Search | OpenTable',
  description: '...',
}

const select = {
  id: true,
  name: true,
  main_image: true,
  price: true,
  cuisine: true,
  location: true,
  slug: true,
  review: true
}

const prisma = new PrismaClient()

interface  FilterType {
  city: string,
  cuisine: string,
  price: PRICE,
}

const fetchFilterRestaurants = async (data: FilterType) => {

  if (!data) return prisma.restaurant.findMany({select});

  const where: any = {}

  if(data.city) {
    const location = {
      name: {
        equals: data.city
      }
    }
    where.location = location
  }

  if(data.cuisine) {
    const cuisine = {
      name: {
        equals: data.cuisine
      }
    }
    where.cuisine = cuisine
  }

  if(data.price) {
    where.price = data.price
  }


  const restaurants = prisma.restaurant.findMany({
    where,
    select
  })
  return restaurants
}

const fetchLocations = async () => prisma.location.findMany()
const fetchCuisines = async () => prisma.cuisine.findMany()


export default async function Search({searchParams}: {searchParams: FilterType}) {

  const filteredRestaurants = await fetchFilterRestaurants(searchParams)
  const locations =await fetchLocations()
  const cuisines = await fetchCuisines()

  const restaurants = filteredRestaurants.map(restaurant => {
    return (
      <RestaurantCard restaurant={restaurant} />
    )
  })

  return (
  <>
  <Header />
    <div className="flex py-4 m-auto w-2/3 justify-between items-start">
      <SearchSidebar 
      locations={locations} 
      cuisines={cuisines}
      searchParams={searchParams}
      />
      <div 
      className="w-5/6">
        {
        restaurants.length >= 1 
        ? 
        restaurants 
        : 
        <h2>{`No restaurants in this area match your search...`}</h2>
        }
      </div>
    </div>
  </>
  )
}
