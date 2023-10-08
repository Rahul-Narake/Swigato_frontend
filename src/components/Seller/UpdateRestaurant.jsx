import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRestaurant } from '../../store/Seller/RestaurantSlice';
import { getServices } from '../../store/Seller/ServiceSlice';

export default function UpdateRestaurant() {
  const { resto } = useParams();
  const dispatch = useDispatch();
  const [image, setImage] = useState({ placeholder: '', file: null });
  const [address, setAddress] = useState({ city: '', area: '' });
  const { services } = useSelector((state) => state.service);
  const [selectedServices, setSelectedServices] = useState([]);
  const { restaurant } = useSelector((state) => state.restaurant);
  const [data, setData] = useState({
    name: '',
    description: '',
    services: [],
    city: '',
    address: {
      area: '',
      city: '',
    },
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRestoImageChange = (e) => {
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

  const handleSelectedService = (e) => {
    const service = e.target.value;
    if (selectedServices.includes(service)) {
      const newServices = selectedServices.filter((srvc) => srvc !== service);
      setSelectedServices(newServices);
    } else {
      selectedServices.push(service);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (localStorage.getItem('auth-token')) {
      if (!image.file) {
        toast.error('Please select image');
        return;
      }

      if (data.name === '') {
        data.name = restaurant.name;
      }
      if (data.description === '') {
        data.description = restaurant.description;
      }

      if (data.services.length === 0) {
        data.services = restaurant.services;
      }

      address.city = data.city;
      data.address = address;
      data.services = selectedServices;

      try {
        const formData = new FormData();
        formData.append('image', image.file);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('city', data.city);
        formData.append('area', address.area);
        formData.append('services', selectedServices);
        formData.append('_id', resto);
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/resto`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
            },
            body: formData,
          }
        );
        const result = await response.json();
        console.log(result);
        if (result.success) {
          toast.success(result.message);
          setData({
            name: '',
            description: '',
            services: [],
            city: '',
            address: {
              area: '',
              city: '',
            },
          });
          setImage({ placeholder: '', file: null });
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(getRestaurant(resto));
      dispatch(getServices());
      if (restaurant.address) {
        setAddress(restaurant.address);
        data.address = restaurant.address;
      }
    }
  }, []);

  return (
    <>
      <div className="flex items-center justify-center px-2 w-full mt-4">
        <div className="bg-white p-8 rounded shadow-md w-96 md:w-[600px]">
          <h2 className="text-2xl font-semibold mb-4">Add Restaurant</h2>
          <form onSubmit={handleUpdate}>
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
                onChange={handleRestoImageChange}
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
                defaultValue={restaurant.name}
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
                defaultValue={restaurant.description}
                rows={5}
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
                defaultValue={restaurant.city}
                onChange={handleChange}
                className="w-full focus:outline-none focus:border-blue-300 rounded-lg p-2 border"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="block font-medium">
                Area
              </label>
              <input
                type="text"
                id="area"
                name="area"
                value={address.area}
                onChange={(e) => {
                  setAddress({ ...address, [e.target.name]: e.target.value });
                }}
                className="w-full focus:outline-none focus:border-blue-300 rounded-lg p-2 border"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="services" className="block font-medium mb-2">
                Select Services available
              </label>
              <div className="flex flex-col space-y-2">
                {services &&
                  services.map((service) => {
                    return (
                      <div
                        key={service._id}
                        className="flex space-x-2 items-center"
                      >
                        <input
                          type="checkbox"
                          name="service"
                          id="service"
                          className="w-6 h-5 "
                          value={service._id}
                          onChange={handleSelectedService}
                        />
                        <p>{service.title}</p>
                      </div>
                    );
                  })}
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
            >
              ADD
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
