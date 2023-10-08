import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../../components/config/config';
import toast from 'react-hot-toast';
const initialState = {
  product: {},
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.product = action.payload.product;
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(getProduct.rejected, (state, action) => {
        toast.error('Something went wrong..');
      });
  },
});

export const getProduct = createAsyncThunk('product/get', async (_id) => {
  const response = await fetch(`${config.BASE_URL}/api/product/${_id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
  });
  const result = await response.json();
  return result;
});

export const {} = productSlice.actions;
export default productSlice.reducer;
