import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../components/config/config';
import toast from 'react-hot-toast';
const initialState = {
  restaurants: [],
  city: 'pune',
  restaurant: {},
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurants.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.restaurants = action.payload.restaurants;
        }
      })
      .addCase(getRestaurants.rejected, (state, action) => {
        toast.error('Something went wrong..');
      });
    builder
      .addCase(getRestaurant.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.restaurant = action.payload.restaurant;
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(getRestaurant.rejected, (state, action) => {
        toast.error('Something went wrong..');
      });
  },
});

export const getRestaurants = createAsyncThunk(
  'Restaurant/get',
  async (data) => {
    const response = await fetch(
      `${config.BASE_URL}/resto/${data.city}/${data.service}`,
      {
        method: 'GET',
      }
    );
    const result = await response.json();
    return result;
  }
);

export const getRestaurant = createAsyncThunk('RestoBYId/get', async (_id) => {
  const response = await fetch(`${config.BASE_URL}/resto/${_id}`, {
    method: 'GET',
  });
  const result = await response.json();
  return result;
});

export const { addCity } = restaurantSlice.actions;
export default restaurantSlice.reducer;
