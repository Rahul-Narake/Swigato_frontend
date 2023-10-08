import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRestaurants } from '../../store/Seller/RestaurantSlice';
import SellerRestaurant from './SellerRestaurant';
export default function SellerRestaurants() {
  const dispatch = useDispatch();
  const { restaurants } = useSelector((state) => state.restaurant);
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(getRestaurants());
    }
  }, []);
  return (
    <>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2">
        {restaurants.length > 0 &&
          restaurants.map((restaurant) => {
            return (
              <SellerRestaurant key={restaurant._id} restaurant={restaurant} />
            );
          })}
      </div>
    </>
  );
}
