import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";

export const fetchDeities = createAsyncThunk(
  "deity/fetchDeities",

  async (_, thunkAPI) => {
    try {
      const response = await api.get("/deities");

      return response.data.deities;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteDeity = createAsyncThunk(
  "deity/deleteDeity",

  async (id, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();

      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };

      await api.delete(`/deities/${id}`, config);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete deity",
      );
    }
  },
);

export const fetchDeityById = createAsyncThunk(
  "deity/fetchDeityById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/deities/${id}`);
      return response.data.deity;
    } catch (error) {
      console.log(error)

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch deity",
      );
    }
  },
);

export const updateDeity = createAsyncThunk(
  "deity/updateDeity",

  async ({ id, formData }, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();

      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const response = await api.put(`/deities/${id}`, formData, config);

      return response.data.deity;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update deity",
      );
    }
  },
);

const deitySlice = createSlice({
  name: "deity",

  initialState: {
    deities: [],
    deity: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchDeities.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchDeities.fulfilled, (state, action) => {
        state.loading = false;
        state.deities = action.payload;
      })

      .addCase(fetchDeities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteDeity.fulfilled, (state, action) => {
        state.loading = false;

        state.deities = state.deities.filter(
          (deity) => deity._id !== action.payload,
        );
      })

      .addCase(fetchDeityById.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchDeityById.fulfilled, (state, action) => {
        state.loading = false;
        state.deity = action.payload;
      })

      .addCase(fetchDeityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateDeity.pending, (state) => {
        state.loading = true;
        state.success = false;
      })

      .addCase(updateDeity.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // update list too
        state.deities = state.deities.map((d) =>
          d._id === action.payload._id ? action.payload : d,
        );

        state.deity = action.payload;
      })

      .addCase(updateDeity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default deitySlice.reducer;
