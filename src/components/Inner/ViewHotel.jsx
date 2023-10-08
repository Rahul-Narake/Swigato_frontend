import React, { useEffect } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { getRestaurant } from '../../store/RestaurantSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BookmarkPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addToBookmark } from '../../store/BookmarkSlice';
import config from '../config/config';
export default function ViewHotel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { city } = useParams();
  const { resto } = useParams();
  const { restaurant } = useSelector((state) => state.restaurant);
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getRestaurant(resto));
  }, []);

  useEffect(() => {
    dispatch(getRestaurant(resto));
  }, [resto]);

  const handleBookmark = (e) => {
    if (isLoggedIn && localStorage.getItem('auth-token')) {
      dispatch(
        addToBookmark({
          id: restaurant._id,
          name: restaurant.name,
          description: restaurant.description,
          image: restaurant.image,
          address: restaurant.address,
        })
      );
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <div className="flex flex-col md:px-6 px-2 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-12 ">
          <div className="flex flex-col col-span-1 col-start-1 md:col-span-8 md:col-start-3">
            <img
              src={`${config.BASE_URL}/image/resto/${restaurant.image}`}
              alt={restaurant.name}
            />
            <h1 className="text-base font-semibold md:text-xl md:font-medium mt-1">
              {restaurant.name}
            </h1>
            <p className="text-base text-gray-400">{restaurant.description}</p>
            <div className="flex justify-between">
              {restaurant.address && (
                <p className="text-base text-gray-400">
                  {restaurant.address.area} , {restaurant.city}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col col-span-1 col-start-1 md:col-span-8 md:col-start-3 mt-4">
            <div
              className="flex border-[1px] border-gray-500 rounded-lg w-[120px] p-2 space-x-1 text-gray-700 font-thin  cursor-pointer"
              onClick={handleBookmark}
            >
              <BookmarkPlus className="text-pink-500" />
              <p>BookMark</p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-12 grid-cols-1 mt-4 ">
          <ul className="md:col-span-8 md:col-start-3 flex md:space-x-6 md:items-center flex-col md:flex-row space-y-2">
            <NavLink
              to={`/${city}/hotel/${restaurant._id}/`}
              className={({ isActive }) =>
                isActive
                  ? 'text-xl text-red-500 cursor-pointer mt-1'
                  : 'text-xl text-gray-500 cursor-pointer mt-1'
              }
            >
              Order Online
            </NavLink>
            <NavLink
              to={`/${city}/hotel/${restaurant._id}/reviews`}
              className={({ isActive }) =>
                isActive
                  ? 'text-xl text-red-500 cursor-pointer'
                  : 'text-xl text-gray-500 cursor-pointer'
              }
            >
              Reviews
            </NavLink>
            <NavLink
              to={`/${city}/hotel/${restaurant._id}/book`}
              className={({ isActive }) =>
                isActive
                  ? 'text-xl text-red-500 cursor-pointer'
                  : 'text-xl text-gray-500 cursor-pointer'
              }
            >
              Book a Table
            </NavLink>
          </ul>

          <div className="md:col-span-8 md:col-start-3 col-span-1 col-start-1 border-b-[3px] border-gray-300 mt-4"></div>
          <div className="md:col-span-8 md:col-start-3 col-span-1 col-start-1 mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
