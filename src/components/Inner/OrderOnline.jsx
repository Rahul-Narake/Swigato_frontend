import { IndianRupee } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import config from '../config/config';

export default function OrderOnline() {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((state) => state.restaurant);
  const { city } = useSelector((state) => state.restaurant);
  const [products, setProducts] = useState([]);
  const { resto } = useParams();

  const loadProducts = (category) => {
    let prs = restaurant.products.map((product) => {
      if (product.category === category) {
        return product;
      }
    });
    setProducts(prs);
  };

  // const getProducts = async () => {
  //   try {
  //     if (resto) {
  //       const response = await fetch(
  //         `${config.BASE_URL}/product/${resto}/products`,
  //         {
  //           method: 'GET',
  //         }
  //       );
  //       const result = await response.json();
  //       if (result.succcess) {
  //         setProducts(result.products);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   console.log(restaurant.products);
  // }, []);

  return (
    <div className="grid grid-cols-3 md:grid-cols-12">
      <div className="col-span-1 col-start-1 md:col-span-2 md:col-start-1 flex flex-col space-y-2 border-r-2">
        {restaurant.productCategories &&
          restaurant.productCategories.map((category) => {
            return (
              <div className="flex w-full" key={category._id}>
                <button
                  onClick={(e) => {
                    loadProducts(category._id);
                  }}
                  className="md:text-xl text-base text-gray-500 font-normal"
                >
                  {category.name}
                </button>
              </div>
            );
          })}
      </div>
      <div className="col-span-2 col-start-2 md:col-span-10 md:col-start-3 flex flex-col pl-2 space-y-2">
        {products &&
          products.map((product, index) => {
            return (
              <div className="w-full" key={index}>
                {product && (
                  <Link
                    to={`/${city}/product/${product._id}`}
                    key={product._id}
                    className="flex flex-col md:flex-row md:space-x-3 "
                  >
                    <div className="flex justify-start md:justify-center">
                      {product.image && (
                        <img
                          src={`${config.BASE_URL}/image/product/${product.image}`}
                          alt={product.name}
                          className="w-32 h-32 rounded-lg"
                        />
                      )}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-4 h-4 grid place-content-center border-2 p-1  ${
                            product.isVeg
                              ? 'border-green-500 text-green-600'
                              : 'border-red-500 text-red-500'
                          }`}
                        >
                          <div
                            className={`w-3 h-3 border-2  rounded-full ${
                              product.isVeg
                                ? 'bg-green-500 text-green-600'
                                : 'bg-red-500 text-red-500'
                            }`}
                          ></div>
                        </div>
                        <h2 className="text-base font-semibold text-black">
                          {product.name}
                        </h2>
                      </div>
                      <p className="text-base text-gray-400 flex items-center">
                        <IndianRupee className="text-base" size={16} />{' '}
                        {product.price}
                      </p>
                      <p className="text-base text-gray-400 flex items-center">
                        {product.description.length < 40
                          ? product.description
                          : product.description.slice(0, 40) + '...'}
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
