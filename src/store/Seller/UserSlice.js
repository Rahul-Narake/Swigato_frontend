import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../../components/config/config';
import toast from 'react-hot-toast';
const initialState = {
  user: {},
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      if (localStorage.getItem('auth-token')) {
        state.isLoggedIn = true;
      }
    },
    logout: (state, action) => {
      localStorage.removeItem('auth-token');
      state.isLoggedIn = false;
      state.user = {};
    },
    setUser: (state, action) => {
      if (localStorage.getItem('auth-token')) {
        state.user = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.success) {
          localStorage.setItem('auth-token', action.payload.token);
          state.isLoggedIn = true;
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(login.rejected, (state, action) => {
        toast.error('Something went wrong');
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.user;
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        toast.error('Something went wrong');
      });
  },
});

export const login = createAsyncThunk('user/login', async (credentials) => {
  const response = await fetch(`${config.BASE_URL}/api/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });
  const result = await response.json();
  return result;
});

// current user
export const getCurrentUser = createAsyncThunk('user/current', async () => {
  const response = await fetch(`${config.BASE_URL}/api/user/current`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    },
  });
  const result = await response.json();
  return result;
});

export const { setLogin, logout, setUser } = userSlice.actions;
export default userSlice.reducer;
