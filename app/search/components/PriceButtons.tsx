import { PRICE } from "@prisma/client"
import Link from "next/link"

export default function PriceButtons({searchParams} : {
    searchParams: {
        city: string,
        cuisine?: string,
        price?: PRICE,
      }
}) {

    const prices = [
        {
          price: PRICE.CHEAP,
          label: "$",
          className: "border w-full text-reg font-light rounded-l p-2 text-center"
        }, 
        {
          price: PRICE.REGULAR,
          label: "$$",
          className: "border-t border-b w-full text-reg font-light p-2 text-center"
        }, 
        {
          price: PRICE.EXPENSIVE,
          label: "$$$",
          className: "border w-full text-reg font-light rounded-r p-2 text-center"
        },
      ]
    
      const priceButtons = prices.map(({price, label, className}) => {
        return (
        <Link 
        href={{
          pathname: "/search",
          query: {
            ...searchParams,
            price,
            
          }
        }}
        className={className}>
          {label}
        </Link>
        )
      })

  return <div className="flex">{priceButtons}</div>

}
