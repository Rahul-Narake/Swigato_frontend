import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function ProfileSidebar() {
  const { user } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col justify-center items-start md:justify-start w-full space-y-4">
      {/* activity */}
      <div className="activity border w-full pl-3">
        <h1 className="md:text-[17px] tracking-widest text-[16px] text-gray-400 font-normal mb-2">
          ACTIVITY
        </h1>
        <div className="space-y-2 pb-2 flex flex-col">
          <NavLink
            to={`/user/`}
            className={({ isActive }) =>
              isActive
                ? 'md:text-[17px] text-base text-red-500 font-normal cursor-pointer'
                : 'md:text-[17px] text-base text-gray-500 font-normal cursor-pointer'
            }
          >
            Reviews
          </NavLink>

          <NavLink
            to={`/user/bookmarks`}
            className={({ isActive }) =>
              isActive
                ? 'md:text-[17px] text-base text-red-500 font-normal cursor-pointer'
                : 'md:text-[17px] text-base text-gray-500 font-normal cursor-pointer'
            }
          >
            Bookmarks
          </NavLink>
        </div>
      </div>
      {/* Order */}
      {user && isLoggedIn && (
        <div className="activity border w-full pl-3">
          <h1 className="md:text-[17px] tracking-widest text-[18px] text-gray-400 font-normal mb-2">
            ONLINE ORDERING
          </h1>
          <ul className="space-y-2 pb-2">
            <NavLink
              to={`/user/orders`}
              className={({ isActive }) =>
                isActive
                  ? 'md:text-[17px] text-base text-red-500 font-normal cursor-pointer'
                  : 'md:text-[17px] text-base text-gray-500 font-normal cursor-pointer'
              }
            >
              Order History
            </NavLink>
          </ul>
        </div>
      )}
      {/* Bookings */}
      {user && isLoggedIn && (
        <div className="activity border w-full pl-3">
          <h1 className="md:text-[17px] tracking-widest text-[18px] text-gray-400 font-normal mb-2">
            Table Booking
          </h1>
          <ul className="space-y-2 pb-2">
            <NavLink
              to={`/user/bookings`}
              className={({ isActive }) =>
                isActive
                  ? 'md:text-[17px] text-base text-red-500 font-normal cursor-pointer'
                  : 'md:text-[17px] text-base text-gray-500 font-normal cursor-pointer'
              }
            >
              Your Bookings
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  );
}
