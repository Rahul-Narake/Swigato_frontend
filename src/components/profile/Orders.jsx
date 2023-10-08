import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../store/OrderSlice';
import Order from './Order';
export default function Orders() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getOrders());
    }
  }, [isLoggedIn]);

  return (
    <>
      {orders.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 w-full">
          {orders &&
            orders.map((order) => {
              return <Order key={order._id} order={order} />;
            })}
        </div>
      )}
      {orders.length === 0 && (
        <div className="flex flex-col justify-center items-center w-full space-y-2">
          <h1 className="text-xl font-bold ">Dont have any orders yet</h1>
          <button className="text-white bg-pink-500 px-2 py-1 rounded-md">
            Order Now
          </button>
        </div>
      )}
    </>
  );
}
