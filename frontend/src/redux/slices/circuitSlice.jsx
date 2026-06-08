import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import Api from "../../services/Api";

export const fetchCircuits = createAsyncThunk(
  "circuit/fetchCircuits",

  async (_, thunkAPI) => {
    try {
      const response = await Api.get("/circuits");

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
      const { data } = await Api.get(`/circuits/${id}`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch circuit",
      );
    }
  },
);

export const updateCircuit = createAsyncThunk(
  "circuit/updateCircuit",
  async ({ id, circuitData }, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();

      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await Api.put(`/circuits/${id}`, circuitData, config);

      return data.circuit;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const deleteCircuit = createAsyncThunk(
  "circuit/deleteFestival",

  async (id, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };

      await Api.delete(`/circuits/${id}`, config);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete festival",
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
    success: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchCircuits.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCircuits.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
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
        state.success = true;
        state.circuit = action.payload.circuit;
      })

      .addCase(fetchSingleCircuit.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      });

    builder
      .addCase(updateCircuit.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateCircuit.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.circuit = action.payload;
      })

      .addCase(updateCircuit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteCircuit.fulfilled, (state, action) => {
        state.loading = false;

        state.circuits = state.circuits.filter(
          (circuit) => circuit._id !== action.payload,
        );
      });
  },
});

export default circuitSlice.reducer;
