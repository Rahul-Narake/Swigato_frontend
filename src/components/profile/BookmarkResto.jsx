import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import config from '../config/config';
export default function BookmarkResto({ restaurant, id }) {
  const { city } = useSelector((state) => state.restaurant);

  return (
    <>
      <Link
        to={`/${restaurant.address.city}/hotel/${id}`}
        className="flex flex-col hover:bg-white"
      >
        <img
          src={`${config.BASE_URL}/image/resto/${restaurant.image}`}
          alt={restaurant.name}
          className="w-full h-[150px] rounded-lg overflow-hidden"
        />
        <h2 className="text-base text-black font-semibold">
          {restaurant.name && restaurant.name}
        </h2>
        <p className="text-gray-500 text-base font-normal">
          {restaurant.description.length < 35
            ? restaurant.description
            : restaurant.description.slice(0, 35) + '...'}
        </p>
        {restaurant.address && (
          <p className="text-gray-500 text-base font-normal">
            {restaurant.address.area}, {restaurant.address.city}
          </p>
        )}
      </Link>
    </>
  );
}
