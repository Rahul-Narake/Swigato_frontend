import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IndianRupee, X } from 'lucide-react';
import swal from 'sweetalert';
import { logout, setLogin } from '../../store/UserSlice';
import config from '../config/config';
import {
  decreseQuantity,
  increseQuantity,
  removeCartItem,
} from '../../store/CartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { city } = useSelector((state) => state.restaurant);

  useEffect(() => {
    if (!isLoggedIn && !localStorage.getItem('auth-token')) {
      dispatch(logout());
      navigate('/login');
    } else {
      dispatch(setLogin());
    }
  }, [isLoggedIn]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleIncresQuantity = (productId) => {
    dispatch(increseQuantity(productId));
  };

  const handleDecreseQuantity = (productId) => {
    dispatch(decreseQuantity(productId));
  };

  const handleRemove = (productId) => {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure that you want to remove this item from cart?',
      icon: 'warning',
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(removeCartItem(productId));
      }
    });
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="grid md:grid-cols-12 sm:grid-cols-6 mx-3">
          <div className="flex flex-col md:col-span-5 md:col-start-3 sm:col-span-4 sm:col-start-1">
            <div className="flex justify-between items-center p-2 border">
              <h2 className=" font-semibold text-black text-md">
                check delivery time and services
              </h2>
              <button
                className="border p-2 font-semibold text-pink-700 text-sm"
                style={{ borderColor: 'pink' }}
              >
                ENTER PIN CODE
              </button>
            </div>
            <h2 className="text-xl font-semibold my-2">Your Cart Items</h2>

            <div className="flex flex-col space-y-3">
              {cartItems &&
                cartItems.map((cartItem, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-wrap justify-between items-start md:space-x-5 space-x-2 border p-2"
                    >
                      <div className="flex flex-col md:flex-row md:space-x-4 space-y-2">
                        <div className="flex justify-start md:justify-center">
                          <img
                            src={`${config.BASE_URL}/image/product/${cartItem.image}`}
                            alt={cartItem.name}
                            className="w-15 h-15 ml-10 mr-0 text-left"
                            style={{ width: '100px', height: '100px' }}
                          />
                        </div>

                        <div className="flex flex-col justify-start items-start space-y-2 text-left">
                          <h2 className="text-sm font-semibold text-black">
                            {cartItem.name}
                          </h2>
                          <p className="flex justify-start items-center text-md text-black">
                            <IndianRupee size={16} className="mt-1" />{' '}
                            {cartItem.price}
                          </p>

                          <div className="flex flex-wrap justify-between items-start space-x-5">
                            <span
                              style={{ borderColor: 'orange' }}
                              className="border p-2 text-center rounded-full hover:outline-none hover:border-orange-500 text-md font-semibold cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                handleIncresQuantity(cartItem.product);
                              }}
                            >
                              +
                            </span>
                            <span
                              style={{ borderColor: 'gray' }}
                              className="border p-2 text-center rounded-full hover:outline-none hover:border-orange-500 text-md font-semibold"
                            >
                              {cartItem.quantity}
                            </span>
                            <span
                              className="border p-2 text-center rounded-full hover:outline-none hover:border-orange-500 text-md font-semibold cursor-pointer"
                              style={{ borderColor: 'green' }}
                              onClick={(e) => {
                                e.preventDefault();
                                handleDecreseQuantity(cartItem.product);
                              }}
                            >
                              -
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemove(cartItem.product);
                        }}
                      >
                        <X />
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col md:col-span-3 md:col-start-8 sm:col-span-2 sm:col-start-5 ml-2 border p-4">
            <h1 className="text-sm font-semibold text-gray-900 mb-3">
              PRICE DETAILS ({cartItems.length} item)
            </h1>
            <hr />
            <ul className="my-3 space-y-3">
              {cartItems.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="flex flex-wrap justify-between items-start "
                  >
                    <h2 className="text-gray-500 font-semibold text-sm">
                      {item.name}
                    </h2>
                    <h2 className="text-gray-500 font-semibold text-sm flex justify-start items-start space-x-2">
                      <IndianRupee
                        style={{ height: '14px' }}
                        className="mt-1"
                      />
                      {item.quantity * item.price}
                    </h2>
                  </li>
                );
              })}
            </ul>
            <hr />
            <ul className="my-3">
              <li className="flex flex-wrap justify-between items-start ">
                <h2 className="text-gray-700 font-semibold text-sm">
                  Total Amount
                </h2>
                <h2 className="text-gray-700 font-semibold text-sm flex justify-start items-start">
                  <IndianRupee
                    size={16}
                    className="mt-1 h-[15px]"
                    style={{ height: '14px' }}
                  />
                  {totalPrice}
                </h2>
              </li>
            </ul>

            {totalPrice > 0 && (
              <Link
                to={`/${city}/user/checkout`}
                className="bg-pink-500 text-white font-bold p-2 mt-6"
              >
                PLACE ORDER
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center space-y-3">
          <h1 className="text-2xl text-pink-700 font-semibold">
            🫠 Looks like dont have items in cart ,want to expore?
          </h1>
          <Link
            to={`/`}
            className="bg-pink-500 text-white font font-semibold p-2 rounded-md"
          >
            Let's Explore
          </Link>
        </div>
      )}
    </>
  );
}
