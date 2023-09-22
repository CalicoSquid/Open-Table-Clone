"use client"
import { Cuisine, Location, PRICE } from '@prisma/client'
import Link from "next/link";
import PriceButtons from './PriceButtons';

export default function SearchSidebar({
  locations, 
  cuisines,
  searchParams,
}: {
  locations: Location[], 
  cuisines: Cuisine[],
  searchParams: {
    city: string,
    cuisine?: string,
    price?: PRICE,
  }
}) {

  
  return (
    <div className="w-1/5">
        <div className="border-b pb-4 flex flex-col">
          <h1 className="mb-2">Region</h1>
          {locations.map(location => {
          return (
          <Link 
          href={{
            pathname: "/search",
            query: {
              ...searchParams,
              city: location.name
            }
          }}
          className="font-light text-reg capitalize" 
          key={location.id}
          >
            {location.name}
          </Link>
          )
          })}
        </div>
        <div className="border-b pb-4 flex flex-col">
          <h1 className="mb-2">Cuisine</h1>
          {cuisines.map(cuisine => { 
            return (
            <Link 
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                cuisine: cuisine.name,
                
              }
            }} 
            className="font-light text-reg capitalize" 
            key={cuisine.id}>
              {cuisine.name}
            </Link>)
            })}
        </div>

        <div className="mt-3 pb-4">
          <h1 className="mb-2">Price</h1>
            <PriceButtons searchParams={searchParams}/>
        </div>
      </div>
  )
}
