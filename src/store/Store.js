import { configureStore } from '@reduxjs/toolkit';
import ServicesSlice from './ServicesSlice';
import RestaurantSlice from './RestaurantSlice';
import UserSlice from './UserSlice';
import ReviewSlice from './ReviewSlice';
import BookmarkSlice from './BookmarkSlice';
import BookingSlice from './BookingSlice';
import ProductSlice from './ProductSlice';
import CartSlice from './CartSlice';
import OrderSlice from './OrderSlice';

const store = configureStore({
  reducer: {
    service: ServicesSlice,
    restaurant: RestaurantSlice,
    user: UserSlice,
    review: ReviewSlice,
    bookmark: BookmarkSlice,
    booking: BookingSlice,
    product: ProductSlice,
    cart: CartSlice,
    order: OrderSlice,
  },
});

export default store;
