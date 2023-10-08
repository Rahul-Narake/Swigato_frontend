import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import Layout from './components/Layout.jsx';
import FeatureLayout from './components/FeatureLayout';
import Restaurants from './components/Restaurants';
import ViewHotel from './components/Inner/ViewHotel';
import OrderOnline from './components/Inner/OrderOnline';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './store/Store';
import Reviews from './components/Inner/Reviews';
import BookTable from './components/Inner/BookTable';
import ProfileLayout from './components/profile/ProfileLayout';
import Bookmarks from './components/profile/Bookmarks';
import EditProfile from './components/profile/EditProfile';
import Bookings from './components/profile/Bookings';
import ViewProduct from './components/Inner/ViewProduct';
import Cart from './components/Inner/Cart';
import CheckOut from './components/Inner/CheckOut';
import Success from './components/Payment/Success';
import Cancel from './components/Payment/Cancel';
import Orders from './components/profile/Orders';
import SellerLandingPage from './components/Seller/SellerLandingPage';
import SellerLayout from './components/Seller/SellerLayout';
import SellerLogin from './components/Seller/SellerLogin';
import SellerSignup from './components/Seller/SellerSignup';
import SellerHome from './components/Seller/SellerHome';
import SellerRestaurants from './components/Seller/SellerRestaurants';
import AddRestaurant from './components/Seller/AddRestaurant';
import ViewRestaurant from './components/Seller/ViewRestaurant';
import Product from './components/Seller/Product';
import EditProduct from './components/Seller/EditProduct';
import AddProduct from './components/Seller/AddProduct';
import AddCategory from './components/Seller/AddCategory';
import UpdateRestaurant from './components/Seller/UpdateRestaurant';
import Dashboard from './components/Seller/Dashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Normal uer routes */}

      <Route path="" element={<Layout />}>
        <Route path="" element={<LandingPage />} />
      </Route>
      <Route path=":city" element={<FeatureLayout />}>
        <Route path=":service" element={<Restaurants />} />
        <Route path="hotel/:resto" element={<ViewHotel />}>
          <Route path="" element={<OrderOnline />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="book" element={<BookTable />} />
        </Route>
        <Route path="product/:productId" element={<ViewProduct />} />
        <Route path="user/cart" element={<Cart />} />
        <Route path="user/checkout" element={<CheckOut />} />
      </Route>
      <Route path="user" element={<ProfileLayout />}>
        <Route path="" element={<Reviews />} />
        <Route path="bookmarks" element={<Bookmarks />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="orders" element={<Orders />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="success" element={<Success />} />
      <Route path="cancel" element={<Cancel />} />

      {/* Merchant */}
      <Route path="partner-with-us" element={<SellerLayout />}>
        <Route path="" element={<SellerLandingPage />} />
        <Route path="home" element={<SellerHome />}>
          <Route path="" element={<Dashboard />} />
          <Route path="restaurants" element={<SellerRestaurants />} />
          <Route path="add-resto" element={<AddRestaurant />} />
        </Route>
        <Route path="resto/:resto" element={<ViewRestaurant />} />
        <Route path="resto/:resto/product/:productId" element={<Product />} />
        <Route path="resto/:resto/product/add" element={<AddProduct />} />
        <Route path="resto/:resto/category/add" element={<AddCategory />} />
        {/* <Route path="resto/:resto/update" element={<UpdateRestaurant />} /> */}
        <Route
          path="resto/:resto/product/:productId/edit"
          element={<EditProduct />}
        />
      </Route>
      <Route path="seller/login" element={<SellerLogin />} />
      <Route path="seller/signup" element={<SellerSignup />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  </>
);
