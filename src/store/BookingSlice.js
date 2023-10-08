import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../components/config/config';
import toast from 'react-hot-toast';
const initialState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(doBooking.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.bookings = action.payload.bookings;
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(doBooking.rejected, (state, action) => {
        toast.error('Something went wrong..');
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.bookings = action.payload.bookings;
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(getBookings.rejected, (state, action) => {
        toast.error('Something went wrong..');
      });
  },
});

export const doBooking = createAsyncThunk('booking/post', async (data) => {
  const response = await fetch(`${config.BASE_URL}/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
    body: JSON.stringify({
      restaurant: data.restaurant,
      date: data.date,
      time: data.time,
      additionalRequest: data.additionalRequest,
      guest: data.guest,
      contactNumber: data.contactNumber,
      restaurantName: data.restaurantName,
    }),
  });
  const result = await response.json();
  return result;
});

export const getBookings = createAsyncThunk('booking/get', async () => {
  const response = await fetch(`${config.BASE_URL}/booking`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
  });
  const result = await response.json();
  return result;
});

export const {} = bookingSlice.actions;
export default bookingSlice.reducer;
