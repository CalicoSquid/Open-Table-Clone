import { PRICE } from "@prisma/client"


export default function Prices({price} : {price: PRICE}) {

    const restaurantPrice = 
    price === PRICE.CHEAP 
    ?
    <div className="flex"><p>$$</p><p className="text-gray-200">$$</p></div> 
    : 
    price === PRICE.REGULAR 
    ? 
    <div className="flex"><p>$$$</p><p className="text-gray-200">$</p></div> 
    :
    <p>$$$$</p>

    return (
        <p className="mr-3">{restaurantPrice}</p>
    )

}