import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../components/config/config';
import toast from 'react-hot-toast';
const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increseQuantity: (state, action) => {
      const items = state.cartItems;
      const newCartItems = items.map((cartItem, index) => {
        if (cartItem.product === action.payload) {
          cartItem.quantity = cartItem.quantity + 1;
        }
        return cartItem;
      });
      state.cartItems = newCartItems;
    },

    decreseQuantity: (state, action) => {
      const items = state.cartItems;
      const newCartItems = items.map((cartItem, index) => {
        if (cartItem.product === action.payload) {
          if (cartItem.quantity !== 0)
            cartItem.quantity = cartItem.quantity - 1;
        }
        return cartItem;
      });
      state.cartItems = newCartItems;
    },
    setCartItems: (state, action) => {
      if (localStorage.getItem('auth-token')) {
        state.cartItems = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.cartItems = action.payload.cartItems;
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        toast.error('Something went wrong..');
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.cartItems = action.payload.cartItems;
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(getCartItems.rejected, (state, action) => {
        toast.error('Something went wrong..');
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        if (action.payload.success) {
          const newCartItems = state.cartItems.filter(
            (item) => item.product !== action.payload.product
          );
          state.cartItems = newCartItems;
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        toast.error('Something went wrong..');
      });
  },
});

export const addToCart = createAsyncThunk('cart/add', async (data) => {
  const response = await fetch(`${config.BASE_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
    body: JSON.stringify({
      restaurant: data.restaurant,
      product: data.product,
      name: data.name,
      description: data.description,
      image: data.image,
      price: data.price,
    }),
  });
  const result = await response.json();
  return result;
});

export const getCartItems = createAsyncThunk('cart/get', async () => {
  const response = await fetch(`${config.BASE_URL}/cart`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
  });
  const result = await response.json();
  return result;
});

export const removeCartItem = createAsyncThunk(
  'cart/remove',
  async (product) => {
    const response = await fetch(`${config.BASE_URL}/cart/${product}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
      },
    });
    const result = await response.json();
    return result;
  }
);

export const { increseQuantity, decreseQuantity, setCartItems } =
  cartSlice.actions;
export default cartSlice.reducer;
