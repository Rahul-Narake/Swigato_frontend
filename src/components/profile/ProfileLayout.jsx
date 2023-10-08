import React from 'react';
import Navbar from '../Inner/Navbar';
import Profile from './Profile';
import Footer from '../Footer';

export default function ProfileLayout() {
  return (
    <>
      <Navbar />
      <Profile />
      <Footer />
    </>
  );
}
