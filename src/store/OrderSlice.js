import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../components/config/config';
import toast from 'react-hot-toast';
const initialState = {
  orders: [],
  session: '',
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      if (localStorage.getItem('auth-token')) {
        state.orders = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.orders = action.payload.orders;
        toast.success(action.payload.message);
      } else {
        toast.error(action.payload.message);
      }
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      toast.error('Something went wrong');
    });
  },
});

export const getOrders = createAsyncThunk('orders/get', async () => {
  const response = await fetch(`${config.BASE_URL}/order`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
  });
  const result = await response.json();
  return result;
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
