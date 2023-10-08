import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../store/ProductSlice';
import { IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../store/CartSlice';
import config from '../config/config';
export default function ViewProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { product } = useSelector((state) => state.product);
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct(productId));
  }, []);

  const handleAddToBag = (e) => {
    e.preventDefault();
    if (!localStorage.getItem('auth-token') || !isLoggedIn) {
      navigate('/login');
    } else {
      dispatch(
        addToCart({
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          restaurant: product.restaurant,
          product: product._id,
        })
      );
    }
  };

  return (
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

        <div className="flex justify-center">
          <button
            onClick={handleAddToBag}
            className="bg-pink-500 text-white rounded-md px-2 py-1 hover:bg-pink-800"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
