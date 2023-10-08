import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Restaurant from './Restaurant';
import { useParams, Link } from 'react-router-dom';
import { addCity, getRestaurants } from '../store/RestaurantSlice';
import { setSelectedService } from '../store/ServicesSlice';
export default function Restaurants() {
  const { city } = useParams();
  const { service } = useParams();
  const dispatch = useDispatch();
  const { restaurants } = useSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(getRestaurants({ city, service }));
    dispatch(setSelectedService(service));
    dispatch(addCity(city));
  }, []);

  return (
    <>
      {restaurants.length > 0 ? (
        <div className="flex flex-col md:px-6 px-2 mt-8">
          <h1 className="text-2xl text-black md:text-3xl font-medium mb-6">
            Delivery Restaurants in {city.toUpperCase()}
          </h1>
          <div className="grid md:grid-cols-4 grid-cols-2 md:gap-5 gap-2">
            {restaurants.map((restaurant) => {
              return (
                <Restaurant key={restaurant._id} restaurant={restaurant} />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-4">
          <div className="flex">
            <h1 className="text-2xl text-black font-normal mr-4">
              Sorry, no results found
            </h1>
            <img
              src="https://b.zmtcdn.com/web/assets/f0b1bdc4cdae3c9e54964d791e83be401614320771.jpeg"
              alt="no result"
              className="w-20 h-20"
            />
          </div>
          <div className="flex">
            <Link
              to={`/`}
              className="bg-pink-600 text-white px-3 py-1 rounded-xl"
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
