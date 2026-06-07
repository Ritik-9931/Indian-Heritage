import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";

// GET ALL CITIES
export const fetchCities = createAsyncThunk(
  "city/fetchCities",

  async (_, thunkAPI) => {
    try {
      const response = await api.get("/cities");

      return response.data.cities;
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
      });
  },
});

export default citySlice.reducer;
