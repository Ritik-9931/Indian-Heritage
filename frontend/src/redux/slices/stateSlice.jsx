import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";

export const fetchStates = createAsyncThunk(
  "state/fetchStates",

  async (_, thunkAPI) => {
    try {
      const response = await api.get("/states");

      return response.data.states;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const fetchSingleState = createAsyncThunk(
  "state/fetchSingleState",

  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/states/${id}`);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const stateSlice = createSlice({
  name: "state",

  initialState: {
    states: [],
    singleState: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchStates.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchStates.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload;
      })

      .addCase(fetchStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSingleState.fulfilled, (state, action) => {
        state.singleState = action.payload;
      });
  },
});

export default stateSlice.reducer;
