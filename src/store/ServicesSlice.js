import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import config from '../components/config/config';
const initialState = {
  services: [],
  selectedService: '',
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setSelectedService: (state, action) => {
      state.services.map((service) => {
        if (service._id === action.payload) {
          state.selectedService = action.payload;
        }
      });
    },
  },
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
  const response = await fetch(`${config.BASE_URL}/service`, {
    method: 'GET',
  });
  const result = await response.json();
  return result;
});

export const { setSelectedService } = serviceSlice.actions;
export default serviceSlice.reducer;
