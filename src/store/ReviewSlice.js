import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../components/config/config';
import toast from 'react-hot-toast';
const initialState = {
  reviews: [],
  lastPage: false,
  total: 0,
  userReview: [],
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setReviews: (state, action) => {
      if (localStorage.getItem('auth-token')) {
        state.reviews = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.reviews = action.payload.reviews;
          state.last = action.payload.last;
          state.total = action.payload.total;
        }
      })
      .addCase(getReviews.rejected, (state, action) => {
        toast.error('Something went wrong..');
      })
      .addCase(getUsersReview.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.reviews = action.payload.reviews;
          state.last = action.payload.last;
          state.total = action.payload.total;
        }
      })
      .addCase(getUsersReview.rejected, (state, action) => {
        toast.error('Something went wrong..');
      });
  },
});

export const getReviews = createAsyncThunk('review/get', async (data) => {
  const response = await fetch(
    `${config.BASE_URL}/review/${data.restaurant}?page=${
      data.page || 1
    }&limit=${2}`,
    {
      method: 'GET',
    }
  );
  const result = await response.json();
  return result;
});

export const getUsersReview = createAsyncThunk(
  'UserReview/get',
  async (data) => {
    const response = await fetch(
      `${config.BASE_URL}/review/?page=${data.page || 1}&limit=${2}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      }
    );
    const result = await response.json();
    return result;
  }
);

export const { setReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
