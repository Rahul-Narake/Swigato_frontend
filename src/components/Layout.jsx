import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/Store';
import { Toaster } from 'react-hot-toast';

export default function Layout() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Toaster />
        <Outlet />
        <Footer />
      </Provider>
    </>
  );
}
