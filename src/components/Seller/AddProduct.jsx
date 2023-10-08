import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategories } from '../../store/Seller/RestaurantSlice';

function AddProduct() {
  const dispatch = useDispatch();
  const { resto } = useParams();
  const { categories } = useSelector((state) => state.restaurant);
  const [isVeg, setIsVeg] = useState(false);
  const [image, setImage] = useState({
    placeholder: '',
    file: null,
  });
  const [data, setData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    restaurant: resto,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (
      e.target.files[0].type === 'image/png' ||
      e.target.files[0].type === 'image/jpeg'
    ) {
      //show preview
      const reader = new FileReader();
      reader.onload = (r) => {
        setImage({ placeholder: r.target.result, file: e.target.files[0] });
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      toast.error('invalid file');
      image.file = null;
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (localStorage.getItem('auth-token')) {
      if (!image.file) {
        toast.error('Please select image');
        return;
      }

      if (data.category == '') {
        toast.error('Please select category');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('image', image.file);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('restaurant', resto);
        formData.append('category', data.category);
        formData.append('isVeg', isVeg);
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/product`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
            },
            body: formData,
          }
        );
        const result = await response.json();
        if (result.success) {
          setData({
            name: '',
            description: '',
            category: '',
            price: '',
            restaurant: resto,
          });
          setImage({
            placeholder: '',
            file: null,
          });
          toast.success(result.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(getCategories(resto));
    }
  }, []);

  return (
    <>
      {localStorage.getItem('auth-token') && (
        <div className="flex items-center justify-center px-2 w-full mt-4">
          <div className="bg-white p-8 rounded shadow-md w-96 md:w-[600px]">
            <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
            <form onSubmit={handleAdd}>
              <img
                src={image.placeholder}
                className="w-100 h-100"
                style={{ width: '150px', margin: 'auto', ObjectFit: 'cover ' }}
              />
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  required
                  onChange={handleImageChange}
                  className="w-full focus:outline-none focus:border-blue-300  rounded-lg p-2 bg-white border "
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={data.name}
                  onChange={handleChange}
                  className="w-full focus:outline-none focus:border-blue-300  rounded-lg p-2 bg-white border "
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium">
                  Description
                </label>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  defaultValue={data.description}
                  rows={5}
                  onChange={handleChange}
                  className="w-full focus:outline-none focus:border-blue-300  rounded-lg p-2 bg-white border "
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block font-medium">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  defaultValue={data.price}
                  onChange={handleChange}
                  className="w-full focus:outline-none focus:border-blue-300  rounded-lg p-2 bg-white border "
                  required
                />
              </div>

              <div className="mb-4 flex space-x-2 items-center">
                <input
                  type="checkbox"
                  id="isVeg"
                  name="isVeg"
                  defaultValue={isVeg}
                  onChange={(e) => {
                    setIsVeg(isVeg ? false : true);
                  }}
                  className="w-4 h-4"
                />
                <p>isVeg</p>
              </div>

              <div className="mb-4">
                <label htmlFor="services" className="block font-medium mb-2">
                  Select Category
                </label>
                <select
                  className="flex flex-col space-y-2 w-full border py-1"
                  id="category"
                  name="category"
                  value={data.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">select category</option>
                  {categories &&
                    categories.map((category) => {
                      return (
                        <option
                          key={category._id}
                          type="text"
                          value={category._id}
                        >
                          {category.title}
                        </option>
                      );
                    })}
                </select>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddProduct;
