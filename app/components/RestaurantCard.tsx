import Link from 'next/link'
import { RestaurantCardType } from '../page'
import getReviewScore from "../utils/getReviewScore"
import Prices from './Prices'
import Stars from './Stars'


export default function RestaurantCard({restaurant} : {restaurant: any}) {

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
      <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
        <Link href={`/restaurant/${restaurant.slug}`}>
        <img src={restaurant.main_image} alt="" className="w-full h-36"/>
      <div className="p-1">
        <h3 className="font-bold text-xxl mb-2">{restaurant.name}</h3>
        <div className="flex items-center">
            <Stars reviews={restaurant.reviews}/>
          <p className="ml-2">{reviewScore}</p>
          
        </div>
      </div>
      <div className="flex text-reg font-light px-1">
        <p className=" mr-3 capitalize">{restaurant.cuisine.name}</p>
        <Prices price={restaurant.price}/>
        <p className="capitalize">{restaurant.location.name}</p>
      </div>
      <div className="text-sm mt-1 font-bold px-1">Booked 11 times today</div>
        </Link>
        
      </div>
  )
}
