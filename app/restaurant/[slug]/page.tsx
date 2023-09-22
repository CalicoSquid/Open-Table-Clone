
import RestaurantNav from "./components/RestaurantNav";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationsCard from "./components/ReservationsCard";
import {PrismaClient, Review } from "@prisma/client";
import { notFound } from "next/navigation";

export interface Restaurant {
    id: number;
    images: string[];
    name: string;
    review: Review[];
    description: string;
    slug: string;
}

const prisma = new PrismaClient();

const fetchRestaurant = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      id: true,
      images: true,
      name: true,
      description: true,
      review: true,
      slug: true,
    }
  })

  if (!restaurant) {
    notFound()
  }

  return restaurant;
}


export default async function RestaurantDetails({params}: {params: {slug: string}}) {

  const restaurant = await fetchRestaurant(params.slug)

  return (
    <>
        <div className="bg-white w-[70%] rounded p-3 shadow">
          <RestaurantNav slug={restaurant.slug}/>
          <Title name={restaurant.name}/>
          <Rating reviews={restaurant.review}/>
          <Description description={restaurant.description}/>
          <Images images={restaurant.images}/>
          <Reviews reviews={restaurant.review}/>
        </div>
        <div className="w-[27%] relative text-reg">
          <ReservationsCard />
          </div>
    </>
  )
}
