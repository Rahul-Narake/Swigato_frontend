import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './UserSlice';
import RestaurantSlice from './RestaurantSlice';
import ServiceSlice from './ServiceSlice';
import ProductSlice from './ProductSlice';

const store = configureStore({
  reducer: {
    user: UserSlice,
    restaurant: RestaurantSlice,
    service: ServiceSlice,
    product: ProductSlice,
  },
});

export default store;
