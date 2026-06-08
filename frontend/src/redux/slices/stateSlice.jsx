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

export const updateState = createAsyncThunk(
  "state/updateState",
  async ({ id, formData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const response = await api.put(`/states/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.state;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const deleteState = createAsyncThunk(
  "state/deleteState",
  async (id, thunkAPI) => {
    try {
      const {auth} = thunkAPI.getState();

      await api.delete(`/states/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
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
      })

      .addCase(updateState.fulfilled, (state, action) => {
        state.states = state.states.map((s) =>
          s._id === action.payload._id ? action.payload : s,
        );
        state.singleState = action.payload;
      })

      .addCase(deleteState.fulfilled, (state, action) => {
        state.states = state.states.filter((s) => s._id !== action.payload);
      });
  },
});

export default stateSlice.reducer;
