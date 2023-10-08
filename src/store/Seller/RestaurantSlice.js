import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../../components/config/config';
import toast from 'react-hot-toast';
const initialState = {
  restaurants: [],
  restaurant: {},
  categories: [],
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {},
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
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.categories = action.payload.categories;
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(getCategories.rejected, (state, action) => {
        toast.error('Something went wrong..');
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (action.payload.success) {
          const products = state.restaurant.products.filter(
            (product) => product._id !== action.payload.product
          );
          state.restaurant.products = products;
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        toast.error('Something went wrong..');
      })
      .addCase(addCategoryToResto.fulfilled, (state, action) => {
        if (action.payload.success) {
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(addCategoryToResto.rejected, (state, action) => {
        toast.error('Something went wrong..');
      })
      .addCase(stopRestoService.fulfilled, (state, action) => {
        if (action.payload.success) {
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      });
  },
});

export const getRestaurants = createAsyncThunk('Restaurant/get', async () => {
  const response = await fetch(`${config.BASE_URL}/api/resto/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
  });
  const result = await response.json();
  return result;
});

export const getRestaurant = createAsyncThunk('RestoBYId/get', async (_id) => {
  const response = await fetch(`${config.BASE_URL}/api/resto/${_id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
  });
  const result = await response.json();
  return result;
});

export const getCategories = createAsyncThunk('categories/get', async (_id) => {
  const response = await fetch(`${config.BASE_URL}/api/category/${_id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
  });
  const result = await response.json();
  return result;
});

export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (data) => {
    const response = await fetch(
      `${config.BASE_URL}/api/product/${data.id}/${data.resto}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      }
    );
    const result = await response.json();
    return result;
  }
);

export const addCategoryToResto = createAsyncThunk(
  'category/add',
  async (data) => {
    const response = await fetch(`${config.BASE_URL}/api/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
      },
      body: JSON.stringify({
        restaurant: data.restaurant,
        title: data.title,
        description: data.description,
      }),
    });
    const result = await response.json();
    return result;
  }
);

export const stopRestoService = createAsyncThunk(
  'resto/remove',
  async (_id) => {
    const response = await fetch(`${config.BASE_URL}/api/resto/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
      },
    });
    const result = await response.json();
    return result;
  }
);

export const {} = restaurantSlice.actions;
export default restaurantSlice.reducer;
