import Stars from "@/app/components/Stars"
import getReviewScore from "@/app/utils/getReviewScore"
import { Review } from "@prisma/client"

export default function ReviewCard({reviews}: {reviews: Review[]}) {

    const reviewList = reviews.map(review => {
      console.log(review.rating)
        return (
            <div className="border-b pb-7 mb-7">
              <div className="flex">
                <div className="w-1/6 flex flex-col items-center">
                  <div
                    className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center"
                  >
                    <h2 className="text-white text-xxl capitalize">
                        {review.first_name.charAt(0)}
                        {review.last_name.charAt(0)}
                    </h2>
                  </div>
                  <p className="text-center">
                    {review.first_name}
                    {" "}
                    {review.last_name}
                  </p>
                </div>
                <div className="ml-10 w-5/6">
                  <div className="flex items-center">
                  <Stars rating={review.rating}/>
                  </div>
                  <div className="mt-5">
                    <p className="text-lg font-light">
                      {review.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
        )
    })
  return (
    <>
    {reviewList}
    </>
    
  )
}