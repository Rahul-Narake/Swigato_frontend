import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getServices, setSelectedService } from '../../store/ServicesSlice';
import { getRestaurants } from '../../store/RestaurantSlice';
import { useParams } from 'react-router-dom';
export default function ServiceBar() {
  const dispatch = useDispatch();
  const { selectedService } = useSelector((state) => state.service);
  const { city } = useParams();
  const { service } = useParams();

  useEffect(() => {
    dispatch(getServices());
    dispatch(setSelectedService(service));
  }, []);

  return (
    <>
      <div className="flex w-full md:px-6 px-4 md:pt-6 pt-6">
        <div className="flex md:space-x-5 space-x-5 items-center">
          {/* Delivery service */}
          <div
            className={`flex flex-col md:flex-row md:space-x-3 items-center cursor-pointer ${
              selectedService === '65588f8cd43571121ed7a93c'
                ? 'border-b-2 border-red-500'
                : ''
            } pb-2`}
            onClick={(e) => {
              dispatch(setSelectedService('65588f8cd43571121ed7a93c'));
              dispatch(
                getRestaurants({ city, service: '65588f8cd43571121ed7a93c' })
              );
            }}
          >
            <div className="w-16 h-16 bg-gray-200 rounded-full grid place-content-center">
              <img
                src="https://b.zmtcdn.com/data/o2_assets/246bbd71fbba420d5996452be3024d351616150055.png"
                alt="Delivry"
                className="w-10 h-10"
              />
            </div>
            <p className="text-base text-gray-500 md:text-xl font-normal">
              Delivery
            </p>
          </div>
          {/* dining service */}
          <div
            className={`flex flex-col md:flex-row md:space-x-3 items-center cursor-pointer pb-2  ${
              selectedService === '65589079d43571121ed7a943'
                ? 'border-b-2 border-red-500'
                : ''
            }`}
            onClick={(e) => {
              dispatch(setSelectedService('65589079d43571121ed7a943'));
              dispatch(
                getRestaurants({ city, service: '65589079d43571121ed7a943' })
              );
            }}
          >
            <div className="w-16 h-16 bg-gray-200 rounded-full grid place-content-center">
              <img
                src="https://b.zmtcdn.com/data/o2_assets/30fa0a844f3ba82073e5f78c65c18b371616149662.png"
                alt="Dining Out"
                className="w-10 h-10"
              />
            </div>
            <p className="text-base text-gray-500 md:text-xl font-normal">
              Dining Out
            </p>
          </div>
          {/* nighlife service */}
          <div
            className={`flex flex-col md:flex-row md:space-x-3 items-center cursor-pointer pb-2 ${
              selectedService === '655890add43571121ed7a946'
                ? 'border-b-2 border-red-500'
                : ''
            }`}
            onClick={(e) => {
              dispatch(setSelectedService('655890add43571121ed7a946'));
              dispatch(
                getRestaurants({ city, service: '655890add43571121ed7a946' })
              );
            }}
          >
            <div className="w-16 h-16 bg-gray-200 rounded-full grid place-content-center">
              <img
                src="https://b.zmtcdn.com/data/o2_assets/01040767e4943c398e38e3592bb1ba8a1616150142.png"
                alt="NightLife"
                className="w-10 h-10"
              />
            </div>
            <p className="text-base text-gray-500 md:text-xl font-normal">
              Nightlife
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
