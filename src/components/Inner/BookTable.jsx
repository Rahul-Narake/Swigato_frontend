import { IndianRupee } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, setUser } from '../../store/UserSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { doBooking } from '../../store/BookingSlice';

export default function BookTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resto } = useParams();
  const { restaurant } = useSelector((state) => state.restaurant);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState({
    restaurant: resto,
    date: '',
    time: '',
    guest: 0,
    contactNumber: '',
    additionalRequest: '',
    restaurantName: restaurant.name || '',
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn && !localStorage.getItem('auth-token')) {
      navigate('/login');
    }
    if (localStorage.getItem('auth-token')) {
      if (data.additionalRequest === '') {
        data.additionalRequest = 'Nothing';
      }
      if (data.restaurantName === '') {
        data.restaurantName = restaurant.name;
      }
      if (data.guest <= 0) {
        return;
      }
      dispatch(doBooking(data));
    }
  };

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(getCurrentUser());
    }
  }, []);

  return (
    <div className="grid grid-cols-6 md:grid-cols-12">
      <div className="flex flex-col col-span-6 col-start-1 md:col-span-10 md:col-start-2 bg-white shadow-lg border p-4">
        <h1 className="text-[20px] font-semibold text-black  md:text-2xl pl-4">
          Please select your booking details
        </h1>
        <form onSubmit={handleSubmit} className="w-full mt-4 px-4">
          <div className="flex flex-col md:flex-row md:space-x-4 items-center w-full">
            <div className="mb-4 w-full">
              <input
                type="date"
                name="date"
                id="date"
                value={data.date}
                onChange={onChange}
                className="border focus:outline-none focus:border-blue-400 w-full h-10 px-2 rounded-lg"
                placeholder="Select Date"
                required
              />
            </div>
            <div className="mb-4 w-full">
              <input
                type="number"
                name="guest"
                id="guest"
                value={data.guest}
                onChange={onChange}
                placeholder="Enter guests"
                className="border focus:outline-none focus:border-blue-400 w-full h-10 px-2 rounded-lg"
                required
              />
            </div>
          </div>
          <div className="w-full mb-4">
            <input
              type="time"
              name="time"
              id="time"
              value={data.time}
              onChange={onChange}
              placeholder="Select time"
              className="border focus:outline-none focus:border-blue-400 w-full h-10 px-2 rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 items-center w-full">
            <div className="mb-4 w-full">
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={user && user.name}
                className="border focus:outline-none focus:border-blue-400 w-full h-10 px-2 rounded-lg"
                placeholder="Your name"
                readOnly
              />
            </div>
            <div className="mb-4 w-full">
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={user && user.email}
                placeholder="Your email"
                className="border focus:outline-none focus:border-blue-400 w-full h-10 px-2 rounded-lg"
                readOnly
              />
            </div>
          </div>
          <div className="w-full mb-4">
            <input
              type="phone"
              name="contactNumber"
              id="contactNumber"
              value={data.contactNumber}
              onChange={onChange}
              placeholder="Enter your contact number"
              className="border focus:outline-none focus:border-blue-400 w-full h-10 px-2 rounded-lg"
              required
            />
          </div>
          <div className="w-full mb-4">
            <textarea
              type="text"
              name="additionalRequest"
              id="additionalRequest"
              value={data.additionalRequest}
              onChange={onChange}
              rows={5}
              placeholder="Additional Request"
              className="border focus:outline-none focus:border-blue-400 w-full px-2 rounded-lg"
            />
          </div>
          <div className="w-full mb-4">
            <button
              type="submit"
              className="bg-pink-600 text-white px-3 py-1 w-full rounded-lg h-10 font-normal text-xl"
            >
              Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
