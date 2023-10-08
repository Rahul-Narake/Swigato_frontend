import { IndianRupee } from 'lucide-react';
import React from 'react';
export default function Order({ order }) {
  return (
    <div className="flex flex-col w-full border shadow-md bg-white  p-2 rounded-md">
      <div className="flex flex-col space-y-1">
        <h1 className="text-base text-black font-semibold">Products</h1>
        {order.products &&
          order.products.map((product) => {
            return (
              <div key={product.id} className="flex flex-col">
                <h1 className="text-base font-normal text-gray-500">
                  {product.name}
                </h1>
                <p className="text-base font-normal text-gray-500 flex items-center text-[20px]">
                  <IndianRupee size={16} className=" h-[14px]" />{' '}
                  {product.price}
                </p>
              </div>
            );
          })}

        <hr />
        <p className="text-base font-normal text-gray-800 flex items-center">
          Total: <IndianRupee size={16} className="h-[14px]" /> {order.amount}
        </p>
        <h1 className="text-base font-normal text-gray-500">{order.date}</h1>
      </div>
    </div>
  );
}
