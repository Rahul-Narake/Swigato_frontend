import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import config from '../config/config';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRestaurant,
  stopRestoService,
} from '../../store/Seller/RestaurantSlice';
export default function ViewRestaurant() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resto } = useParams();
  const { restaurant } = useSelector((state) => state.restaurant);

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(getRestaurant(resto));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(getRestaurant(resto));
    }
  }, [resto]);

  const handleStopService = (e) => {
    e.preventDefault();
    if (localStorage.getItem('auth-token')) {
      dispatch(stopRestoService(resto));
      navigate('/partner-with-us/home/restaurants');
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
              className="w-full md:h-96 h-60 rounded-md"
            />
            <div className="flex justify-between">
              <h1 className="text-base font-semibold md:text-xl md:font-medium mt-1">
                {restaurant.name}
              </h1>
            </div>
            <p className="text-base text-gray-400">{restaurant.description}</p>
            <div className="flex justify-between mb-2">
              {restaurant.address && (
                <p className="text-base text-gray-400">
                  {restaurant.address.area} , {restaurant.city}
                </p>
              )}
            </div>

            <hr />

            {restaurant.products && (
              <>
                <h1 className="text-xl font-semibold text-black my-2">
                  Products
                </h1>
                <div className="w-full grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2 mb-2">
                  {restaurant.products.length > 0 &&
                    restaurant.products.map((product, index) => {
                      if (product) {
                        return (
                          <Link
                            to={`/partner-with-us/resto/${resto}/product/${product._id}`}
                            key={index}
                            className="flex flex-col hover:bg-white hover:shadow-md hover:border hover:rounded-md hover:cursor-pointer p-2 bg-white shadow-md border"
                          >
                            <div className="flex justify-start">
                              <img
                                src={`${config.BASE_URL}/image/product/${product.image}`}
                                alt={product.name}
                                className="rounded-md w-full"
                              />
                            </div>
                            <h1 className="text-base font-semibold text-black">
                              {product.name}
                            </h1>
                            <p className="text-base font-normal text-gray-500">
                              {product.description}
                            </p>
                          </Link>
                        );
                      }
                    })}
                </div>
              </>
            )}
            {!restaurant.products && (
              <div className="flex flex-col justify-center space-y-2 mb-2">
                <h1 className="text-black font-semibold text-base">
                  Dont have any products yet....
                </h1>
              </div>
            )}

            <hr />

            <div className="mt-2 flex space-x-2 flex-wrap">
              <button
                className="border bg-red-400 text-white px-2 py-1 rounded-md"
                onClick={handleStopService}
              >
                Stop Service
              </button>
              <Link
                to={`/partner-with-us/resto/${resto}/product/add`}
                className="border bg-green-400 text-white px-2 py-1 rounded-md"
              >
                Add Product
              </Link>
              <Link
                to={`/partner-with-us/resto/${resto}/category/add`}
                className="border bg-green-400 text-white px-2 py-1 rounded-md"
              >
                Add Category
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
