import { Star } from 'lucide-react';
import React from 'react';

export default function Review({ review }) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-2 ">
        <img
          src={review.image}
          alt={review.name}
          className="w-12 h-12 rounded-full"
        />
        <h2 className="text-base text-black font-semibold">{review.name}</h2>
      </div>
      <div className="flex space-x-3">
        <div
          className={`flex items-center w-8 h-6 justify-center ${
            review.rating < 3 ? 'bg-red-800' : 'bg-green-800'
          } text-white font-normal rounded-lg`}
        >
          {review.rating} <Star className="w-3 h-3 ml-1 font-bold" />
        </div>
        <p className="text-base text-gray-600">
          {new Date(review.date).toUTCString()}
        </p>
      </div>

      {review.message ? (
        <p className="text-base text-gray-500">{review.message}</p>
      ) : (
        ''
      )}
    </div>
  );
}
