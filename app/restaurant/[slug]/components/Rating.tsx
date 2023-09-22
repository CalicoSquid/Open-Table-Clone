import Stars from "@/app/components/Stars";
import getReviewScore from "@/app/utils/getReviewScore";
import { Review } from "@prisma/client";


export default function Rating({reviews}: {reviews: Review[]}) {
  return (
    <div className="flex items-end">
          <div className="ratings mt-2 flex items-center">
          <Stars reviews={reviews}/>
            <p className="text-reg ml-3">{getReviewScore(reviews)}</p>
          </div>
          <div>
            <p className="text-reg ml-4">{`${reviews.length} Reviews`}</p>
          </div>
        </div>
  )
}
