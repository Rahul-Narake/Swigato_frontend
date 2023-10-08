import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBookings } from '../../store/BookingSlice';
import BookingItem from './BookingItem';
import { Link } from 'react-router-dom';

export default function Bookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.booking);

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(getBookings());
    }
  }, []);

  return (
    <>
      <div className="grid md:grid-cols-4 grid-cols-2 px-2 gap-2 md:gap-4">
        {bookings &&
          bookings.map((booking) => {
            return <BookingItem key={booking._id} booking={booking} />;
          })}
      </div>

      {bookings.length == 0 && (
        <div className="flex justify-center items-center flex-col w-full">
          <h1 className="text-xl font-semibold text-black">
            Don't Have any Bookings yet
          </h1>
          <Link
            to={'/'}
            className="text-white bg-pink-500 px-2 py-1 rounded-lg mt-4"
          >
            Let's Expore
          </Link>
        </div>
      )}
    </>
  );
}
