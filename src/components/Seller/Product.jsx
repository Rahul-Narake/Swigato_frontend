import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../store/Seller/ProductSlice';
import { Edit, IndianRupee, Trash } from 'lucide-react';
import { deleteProduct } from '../../store/Seller/RestaurantSlice';
import { useNavigate } from 'react-router-dom';
import config from '../config/config';

export default function ViewProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { resto } = useParams();
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(getProduct(productId));
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(getProduct(productId));
    }
  }, [productId]);

  return (
    <>
      {product && (
        <div className="grid grid-cols-1 md:grid-cols-12 mx-4 mt-4">
          <div className="col-span-1 col-start-1 md:col-span-6 md:col-start-4 px-2 md:px-6 bg-white border shadow-lg flex flex-col p-2 rounded-md space-y-2">
            <div className="flex justify-center">
              <img
                src={`${config.BASE_URL}/image/product/${product.image}`}
                alt={product.name}
              />
            </div>
            <h1 className="text-xl text-black font-semibold">{product.name}</h1>
            <p className="text-base text-gray-500 font-normal">
              {product.description}
            </p>
            <p className="text-[17px] text-gray-500 font-medium flex items-center ">
              <IndianRupee className="text-[17px]" size={16} /> {product.price}
            </p>

            <div className="flex justify-start text-gray-600 space-x-2">
              <Link
                to={`/partner-with-us/resto/${resto}/product/${product._id}/edit`}
              >
                <Edit className="cursor-pointer " />
              </Link>
              <Trash
                className="cursor-pointer "
                onClick={(e) => {
                  dispatch(deleteProduct({ id: productId, resto: resto }));
                  navigate(`/partner-with-us/resto/${resto}`);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
