import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { logout, setLogin } from '../../store/UserSlice';
import { loadStripe } from '@stripe/stripe-js';
import { setCartItems } from '../../store/CartSlice';

export default function CheckOut() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const KEY_ID = import.meta.env.VITE_KEY_ID;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { city } = useSelector((state) => state.restaurant);
  const { cartItems } = useSelector((state) => state.cart);

  const toggleAddressBox = (e) => {
    e.preventDefault();
    const modal = document.getElementById('address-box');
    modal.classList.toggle('hidden');
  };

  const confirmAddress = (e) => {
    e.preventDefault();
    const modal = document.getElementById('address-box');
    modal.classList.toggle('hidden');
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = (e) => {
    e.preventDefault();
    if (totalPrice <= 0) {
      toast.error('Please purchase something');
      navigate('/');
      return;
    }
    let products = [];
    const currency = 'INR';
    const amount = totalPrice;
    if (cartItems) {
      for (let i = 0; i < cartItems.length; i++) {
        let obj = {
          id: cartItems[i]._id,
          name: cartItems[i].name,
          quantity: cartItems[i].quantity,
          price: cartItems[i].price,
        };
        products.push(obj);
      }
    }
    createOrder(products, amount, currency);
  };

  const completeOrder = async (session) => {
    if (session) {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/order/complete/${session}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        dispatch(setCartItems([]));
      }
    }
  };

  const createOrder = async (products, amount, currency) => {
    try {
      const stripe = await loadStripe(KEY_ID);
      const response = await fetch(`${BASE_URL}/order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({ products, amount, currency }),
      });
      const result = await response.json();
      if (result.sessionId && result.success) {
        await completeOrder(result.sessionId);
        stripe.redirectToCheckout({
          sessionId: result.sessionId,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!isLoggedIn && !localStorage.getItem('auth-token')) {
      dispatch(logout());
      navigate('/user/login');
    }
    if (localStorage.getItem('auth-token')) {
      dispatch(setLogin());
    }
  }, [isLoggedIn]);

  return (
    <div className="grid md:grid-cols-12 sm:grid-cols-1">
      <div className="flex flex-col md:col-span-4 md:col-start-5 sm:col-soan-1 sm:col-start-1 mx-3 bg-white border shadow-md p-3">
        <button
          onClick={toggleAddressBox}
          className="text-md font-semibold cursor-pointer text-blue-700 m-3"
        >
          Confirm Address
        </button>
        <div id="address-box" className="hidden">
          <form
            onSubmit={confirmAddress}
            className="bg-white border p-2 shadow-md"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="City"
              >
                City
              </label>
              <input
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                type="text"
                id="city"
                name="city"
                defaultValue={city}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="pincode"
              >
                Pincode
              </label>
              <input
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                type="text"
                id="pincode"
                name="pincode"
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-900 text-white p-2 rounded-md"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>

        <div>
          <form onSubmit={handleCheckout}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Amount"
              >
                Amount
              </label>
              <input
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                type="Number"
                id="amount"
                name="amount"
                required
                value={totalPrice}
                readOnly
              />
            </div>
            <div className="flex justify-center items-center">
              <button className="bg-pink-500 hover:bg-pink-900 text-white font-semibold text-md p-2 rounded-lg">
                Checkout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
