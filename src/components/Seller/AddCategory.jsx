import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  addCategoryToResto,
  getRestaurant,
} from '../../store/Seller/RestaurantSlice';

function AddCategory() {
  const dispatch = useDispatch();
  const { resto } = useParams();

  const [data, setData] = useState({
    title: '',
    description: '',
    restaurant: resto,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (localStorage.getItem('auth-token')) {
      dispatch(
        addCategoryToResto({
          title: data.title,
          description: data.description,
          restaurant: resto,
        })
      );
      setData({
        title: '',
        description: '',
        restaurant: resto,
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(getRestaurant(resto));
    }
  }, []);

  return (
    <>
      {localStorage.getItem('auth-token') && (
        <div className="flex items-center justify-center px-2 w-full mt-4">
          <div className="bg-white p-8 rounded shadow-md w-96 md:w-[600px]">
            <h2 className="text-2xl font-semibold mb-4">Add Category</h2>
            <form onSubmit={handleAdd}>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium">
                  title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={data.title}
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

export default AddCategory;
