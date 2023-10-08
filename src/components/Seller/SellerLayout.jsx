import React from 'react';
import SellerNavbar from './SellerNavbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import { Provider } from 'react-redux';
import store from '../../store/Seller/store';

export default function SellerLayout() {
  return (
    <div className="w-full">
      <Provider store={store}>
        <SellerNavbar />
        <Outlet />
        <Footer />
      </Provider>
    </div>
  );
}
