import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import config from './config/config';
export default function Restaurant({ restaurant }) {
  const { city } = useSelector((state) => state.restaurant);

  return (
    <Link
      to={`/${city}/hotel/${restaurant._id}`}
      className="flex flex-col md:max-w-[350px] hover:bg white hover:border hover:shadow-md p-2 rounded-md hover:cursor-pointer"
    >
      <img
        src={`${config.BASE_URL}/image/resto/${restaurant.image}`}
        alt={restaurant.name}
        className="rounded-md mb-2 h-40"
      />
      <div className="flex justify-between">
        <h1 className="text-base font-semibold text-black">
          {restaurant.name}
        </h1>
        {restaurant.rating.length > 0 && <p>{}</p>}
      </div>
      <div className="flex justify-between">
        <p className="text-base text-gray-400">
          {restaurant.description.length < 35
            ? restaurant.description
            : restaurant.description.slice(0, 35) + '...'}
        </p>
      </div>
      <div className="flex justify-between">
        <p className="text-base text-gray-400">
          {restaurant.address.area} , {restaurant.city}
        </p>
      </div>
    </Link>
  );
}
