import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Api from "../../services/Api";

// GET RITUALS
export const fetchRituals = createAsyncThunk(
  "ritual/fetchRituals",

  async (_, thunkAPI) => {
    try {
      const response = await Api.get("/rituals");

      return response.data.rituals;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

// CREATE RITUAL
export const createRitual = createAsyncThunk(
  "ritual/createRitual",

  async (ritualData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const response = await Api.post("/rituals", ritualData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.ritual;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteRitual = createAsyncThunk(
  "ritual/deleteRitual",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      await Api.delete(`/rituals/${id}`, {
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

export const updateRitual = createAsyncThunk(
  "ritual/updateRitual",
  async ({ id, formData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const response = await Api.put(`/rituals/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.ritual;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Update failed",
      );
    }
  },
);

export const fetchRitualById = createAsyncThunk(
  "ritual/fetchRitualById",
  async (id, thunkAPI) => {
    try {
      const response = await Api.get(`/rituals/${id}`);
      return response.data.ritual;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetch failed",
      );
    }
  },
);

const ritualSlice = createSlice({
  name: "ritual",

  initialState: {
    rituals: [],

    ritual: null,

    loading: false,

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchRituals.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchRituals.fulfilled, (state, action) => {
        state.loading = false;

        state.rituals = action.payload;
      })

      .addCase(fetchRituals.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // CREATE
      .addCase(createRitual.pending, (state) => {
        state.loading = true;
      })

      .addCase(createRitual.fulfilled, (state, action) => {
        state.loading = false;

        state.rituals.unshift(action.payload);
      })

      .addCase(createRitual.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(deleteRitual.fulfilled, (state, action) => {
        state.loading = false;
        state.rituals = state.rituals.filter((r) => r._id !== action.payload);
      })

      .addCase(updateRitual.fulfilled, (state, action) => {
        state.loading = false;

        state.rituals = state.rituals.map((r) =>
          r._id === action.payload._id ? action.payload : r,
        );

        state.ritual = action.payload;
      })

      .addCase(fetchRitualById.fulfilled, (state, action) => {
        state.loading = false;
        state.ritual = action.payload;
      });
  },
});

export default ritualSlice.reducer;
