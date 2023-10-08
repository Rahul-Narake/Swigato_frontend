import { Home, Hotel, Utensils } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SellerSidebar() {
  return (
    <div className="flex flex-col bg-white shadow-md border md:pl-2 md:py-2 pl-4 pt-2 space-y-2">
      <div className="flex flex-col w-full justify-center">
        <h1 className="text-base font-semibold text-black mb-2">Menu</h1>
        <ul className="space-y-2">
          <NavLink
            to={'/partner-with-us/home/'}
            className={({ isActive }) =>
              isActive
                ? ' text-red-500 cursor-pointer space-x-2 flex pl-2'
                : ' text-gray-500 cursor-pointer space-x-2 flex pl-2'
            }
          >
            <Home />
            <p className="text-base text-gary-500 space-x-2">Home</p>
          </NavLink>
        </ul>
      </div>
      <hr />
      <div className="flex flex-col w-full justify-center">
        <h1 className="text-base font-semibold text-black mb-2">ACTIONS</h1>
        <ul className="space-y-4">
          <NavLink
            to={'/partner-with-us/home/restaurants'}
            className={({ isActive }) =>
              isActive
                ? ' text-red-500 cursor-pointer space-x-2 flex pl-2'
                : ' text-gray-500 cursor-pointer space-x-2 flex pl-2'
            }
          >
            <Hotel />
            <p className="text-base text-gary-500 space-x-2">Restaurants</p>
          </NavLink>
          <NavLink
            to={'/partner-with-us/home/add-resto'}
            className={({ isActive }) =>
              isActive
                ? ' text-red-500 cursor-pointer space-x-2 flex pl-2'
                : ' text-gray-500 cursor-pointer space-x-2 flex pl-2'
            }
          >
            <Utensils />
            <p className="text-base text-gary-500 space-x-2">Add Restaurant</p>
          </NavLink>
        </ul>
      </div>
      <hr />
    </div>
  );
}
