import React from 'react';
import getReviewScore from '../utils/getReviewScore';
import Image from 'next/image';
import star from '../../public/icons/icons/full-star.png';
import emptyStar from '../../public/icons/icons/empty-star.png';
import halfStar from '../../public/icons/icons/half-star.png';
import { Review } from '@prisma/client';

export default function Stars({ reviews, rating }: { reviews?: Review[]; rating?: number }) {
  const reviewScore = rating || parseFloat(getReviewScore(reviews));

  const renderStars = () => {
    const starsArr = Array.from(Array(5)).map((x, i) => {
      const diff = reviewScore - i;
      if (diff >= 1) {
        // Display a full star for whole numbers
        return <Image src={star} alt="" style={{ height: '15px', width: '15px' }} />;
      } else if (diff >= 0.5) {
        // Display a half star for values with .5 decimal place
        return <Image src={halfStar} alt="" style={{ height: '15px', width: '15px' }} />;
      } else {
        // Display an empty star for all other cases
        return <Image src={emptyStar} alt="" style={{ height: '15px', width: '15px' }} />;
      }
    });

    return starsArr;
  };

  return <div className="flex">{renderStars()}</div>;
}
