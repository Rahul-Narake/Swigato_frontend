import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../components/config/config';
import toast from 'react-hot-toast';
const initialState = {
  bookmarks: [],
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToBookmark.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.bookmarks = action.payload.bookmarks;
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(addToBookmark.rejected, (state, action) => {
        toast.error('Something went wrong..');
      })
      .addCase(getBookmarks.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.bookmarks = action.payload.bookmarks;
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(getBookmarks.rejected, (state, action) => {
        toast.error('Something went wrong..');
      });
  },
});

export const addToBookmark = createAsyncThunk('bookmark/add', async (data) => {
  const restaurant = {
    name: data.name,
    description: data.description,
    image: data.image,
    address: data.address,
  };
  const response = await fetch(`${config.BASE_URL}/bookmark/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
    body: JSON.stringify({ restaurant, id: data.id }),
  });
  const result = await response.json();
  return result;
});

export const getBookmarks = createAsyncThunk('bookmark/get', async () => {
  const response = await fetch(`${config.BASE_URL}/bookmark`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
  });
  const result = await response.json();
  return result;
});

export const {} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
