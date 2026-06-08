import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";

// GET ALL CITIES
export const fetchCities = createAsyncThunk(
  "city/fetchCities",

  async (_, thunkAPI) => {
    try {
      const response = await api.get("/cities");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const fetchSingleCity = createAsyncThunk(
  "city/fetchSingleCity",

  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/cities/${id}`);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

// GET CITIES BY STATE
export const fetchCitiesByState = createAsyncThunk(
  "city/fetchCitiesByState",

  async (stateId, thunkAPI) => {
    try {
      const response = await api.get(`/cities/state/${stateId}`);

      return response.data.cities;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteCity = createAsyncThunk(
  "city/deleteCity",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      await api.delete(`/cities/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Delete failed",
      );
    }
  },
);

export const updateCity = createAsyncThunk(
  "city/updateCity",
  async ({ id, formData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const response = await api.put(`/cities/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.city;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Update failed",
      );
    }
  },
);

const citySlice = createSlice({
  name: "city",

  initialState: {
    cities: [],
    singleCity: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })

      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchCitiesByState.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCitiesByState.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })

      .addCase(fetchCitiesByState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSingleCity.fulfilled, (state, action) => {
        state.singleCity = action.payload;
      })

      .addCase(deleteCity.fulfilled, (state, action) => {
        state.cities = state.cities.filter((c) => c._id !== action.payload);
      })

      .addCase(updateCity.fulfilled, (state, action) => {
        state.cities = state.cities.map((c) =>
          c._id === action.payload._id ? action.payload : c,
        );

        state.singleCity = action.payload;
      });
  },
});

export default citySlice.reducer;
