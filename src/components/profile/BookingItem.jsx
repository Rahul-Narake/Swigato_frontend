import React from 'react';

export default function BookingItem({ booking }) {
  return (
    <div className="flex flex-col space-y-2 bg-white shadow-lg border h-44 p-2 rounded-sm">
      <h2 className="text-base font-semibold text-black">
        Restaurant : {booking.restaurantName}
      </h2>
      <p className="text-base text-gray-500 font-normal">
        Date: {booking.date}
      </p>
      <p className="text-base text-gray-500 font-normal">
        Time: {booking.time}
      </p>
      <p className="text-base text-gray-500 font-normal">
        Guest: {booking.guest}
      </p>
    </div>
  );
}
