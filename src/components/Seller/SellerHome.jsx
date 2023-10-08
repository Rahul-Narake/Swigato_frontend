import React, { useEffect } from 'react';
import SellerSidebar from './SellerSidebar';
import Content from './Content';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setLogin } from '../../store/Seller/UserSlice';
import { useNavigate } from 'react-router-dom';
import { getServices } from '../../store/Seller/ServiceSlice';

export default function SellerHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(setLogin());
    } else {
      dispatch(logout());
      navigate('/partner-with-us');
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      dispatch(setLogin());
      dispatch(getServices());
    } else {
      dispatch(logout());
      navigate('/partner-with-us');
    }
  }, [isLoggedIn]);

  return (
    <div className="w-full grid grid-cols-1  md:grid-cols-12 md:px-4 px-2 mt-4 md:gap-2">
      <div className="col-span-1 col-start-1 md:col-span-2 md:col-start-1 w-full">
        <SellerSidebar />
      </div>
      <div className="col-span-1 col-start-1 md:col-span-10 md:col-start-3 w-full">
        <Content />
      </div>
    </div>
  );
}
