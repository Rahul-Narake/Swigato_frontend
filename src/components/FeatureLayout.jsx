import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Inner/Navbar';
import ServiceBar from './Inner/ServiceBar';
import store from '../store/Store';
import { Provider } from 'react-redux';
import Footer from './Footer';

export default function FeatureLayout() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <ServiceBar />
        <Outlet />
        <Footer />
      </Provider>
    </>
  );
}
