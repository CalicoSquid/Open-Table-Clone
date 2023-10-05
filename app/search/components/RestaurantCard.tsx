import Prices from "@/app/components/Prices";
import Stars from "@/app/components/Stars";
import getReviewScore from "@/app/utils/getReviewScore";
import Link from "next/link";

export default function RestaurantCard({restaurant}: {restaurant: any}) {

  const rating = parseFloat(getReviewScore(restaurant.reviews))

  const reviewScore = 
    rating  > 4 
    ? 
    "Amazing" 
    : 
    rating >= 3 &&  rating  <= 4 
    ? 
    "Awesome"
    :
    rating  > 0
    ?
    "Good"
    :
    ""

  return (
    <div className="border-b flex pb-5 ml-4">
      
        <img
            src={restaurant.main_image}
            alt=""
            className="w-44 rounded object-cover"
          />
          <div className="pl-5">
            <h2 className="text-xxxl">{restaurant.name}</h2>
            <div className="flex items-start">
            <Stars reviews={restaurant.reviews}/>
              <p className="ml-2 text-sm">{reviewScore}</p>
            </div>
            <div className="mb-9">
              <div className="font-light flex text-reg">
                <Prices price={restaurant.price}/>
                <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
                <p className="mr-4 capitalize">{restaurant.location.name}</p>
              </div>
            </div>
            <Link href={`/restaurant/${restaurant.slug}`}>
            <div className="text-red-600">
              <a href="">View more information</a>
            </div>
            </Link>
          </div>
      
    </div>
  )
}
