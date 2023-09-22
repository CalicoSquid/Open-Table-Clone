export default function getReviewScore(reviews) {

  if(!reviews.length) return '0';
  
  let count = 0;

  reviews.map(rev => {
    count += rev.rating
  })
  const reviewScore = (Math.round(count/reviews.length * 2) / 2).toFixed(1)
 
 return reviewScore;
}