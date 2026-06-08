import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const registerUser = createAsyncThunk(
  "auth/register",

  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/auth/register", userData);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Register failed",
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",

  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", userData);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed",
      );
    }
  },
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",

  async (Credential, thunkAPI) => {
    try {
      const response = await api.post("/auth/googleLogin", {
        token: Credential,
      });

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Google login failed",
      );
    }
  },
);
const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(googleLogin.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.user = action.payload.user;

        state.token = action.payload.token;
      })

      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
