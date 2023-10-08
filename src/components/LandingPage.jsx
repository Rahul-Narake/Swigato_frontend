import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../store/ServicesSlice';
import { Link } from 'react-router-dom';
import config from '../components/config/config';

export default function LandingPage() {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.service);
  const { city } = useSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(getServices());
  }, []);

  return (
    <div className="flex flex-col w-full md:px-44 mt-6 px-4">
      <div className="grid grid-cols-3 md:gap-5 gap-2">
        {services.map((service) => {
          return (
            <Link
              to={city && `/${city}/${service._id}`}
              key={service._id}
              className="flex flex-col border shadow-sm rounded-lg md:max-w-[350px]"
            >
              <img
                src={`${config.BASE_URL}/image/service/${service.image}`}
                alt={service.title}
                className="md:h-32 h-40  rounded-t-lg overflow-hidden"
              />
              <div className="flex flex-col md:p-4 p-2">
                <h2 className="md:text-xl text-gray-600 text-sm font-medium">
                  {service.title}
                </h2>
                <p className="text-sm md:text-base font-thin md:font-normal text-gray-700">
                  {service.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
