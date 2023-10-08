import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../../components/config/config';
import toast from 'react-hot-toast';
const initialState = {
  services: [],
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getServices.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.services = action.payload.services;
        }
      })
      .addCase(getServices.rejected, (state, action) => {
        toast.error('Something went wrong..');
      });
  },
});

export const getServices = createAsyncThunk('service/get', async () => {
  const response = await fetch(`${config.BASE_URL}/api/service`, {
    method: 'GET',
  });
  const result = await response.json();
  return result;
});

export const {} = serviceSlice.actions;
export default serviceSlice.reducer;
