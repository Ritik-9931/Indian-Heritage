import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";

export const fetchCircuits = createAsyncThunk(
  "circuit/fetchCircuits",

  async (_, thunkAPI) => {
    try {
      const response = await api.get("/circuits");

      return response.data.circuits;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const fetchSingleCircuit = createAsyncThunk(
  "circuit/fetchSingleCircuit",

  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`/circuits/${id}`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch circuit",
      );
    }
  },
);

const circuitSlice = createSlice({
  name: "circuit",

  initialState: {
    circuits: [],
    circuit: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchCircuits.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCircuits.fulfilled, (state, action) => {
        state.loading = false;
        state.circuits = action.payload;
      })

      .addCase(fetchCircuits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchSingleCircuit.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchSingleCircuit.fulfilled, (state, action) => {
        state.loading = false;
        state.circuit = action.payload.circuit;
      })

      .addCase(fetchSingleCircuit.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      });
  },
});

export default circuitSlice.reducer;
