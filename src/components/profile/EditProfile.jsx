import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../store/UserSlice';
function EditProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [image, setImage] = useState({ placeholder: '', file: null });
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleProfileImageChange = (e) => {
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!image.file) {
      toast.error('Please select image');
      return;
    }
    if (data.name === '') {
      data.name = user.name;
    }
    if (data.email === '') {
      data.email = user.email;
    }
    if (data.city === '') {
      data.city = user.city;
    }
    try {
      const formData = new FormData();
      formData.append('image', image.file);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('city', data.city);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        dispatch(setUser(result.user));
        toast.success(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {user.name && (
        <div className="flex items-center justify-center px-2 w-full mt-4">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4">Edit Your Profile</h2>
            <form onSubmit={handleUpdate}>
              <img
                src={image.placeholder}
                className="w-100 h-100"
                style={{ width: '150px', margin: 'auto', ObjectFit: 'cover ' }}
              />
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium">
                  Profile
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  required
                  onChange={handleProfileImageChange}
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
                  defaultValue={user.name}
                  onChange={handleChange}
                  className="w-full focus:outline-none focus:border-blue-300  rounded-lg p-2 bg-white border "
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={user.email}
                  onChange={handleChange}
                  className="w-full focus:outline-none focus:border-blue-300  rounded-lg p-2 bg-white border "
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="block font-medium">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  defaultValue={user.city}
                  onChange={handleChange}
                  className="w-full focus:outline-none focus:border-blue-300 rounded-lg p-2 border"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile;
