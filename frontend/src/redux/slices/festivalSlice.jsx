import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";

export const fetchFestivals = createAsyncThunk(
  "festival/fetchFestivals",

  async (_, thunkAPI) => {
    try {
      const response = await api.get("/festivals");

      return response.data.festivals;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const fetchSingleFestival = createAsyncThunk(
  "festival/fetchSingleFestival",

  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`/festivals/${id}`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch festival",
      );
    }
  },
);

export const updateFestival = createAsyncThunk(
  "festival/updateFestival",

  async ({ id, festivalData }, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const { data } = await api.put(`/festivals/${id}`, festivalData, config);

      return data.festival;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update festival",
      );
    }
  },
);

export const deleteFestival = createAsyncThunk(
  "festival/deleteFestival",

  async (id, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };

      await api.delete(`/festivals/${id}`, config);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete festival",
      );
    }
  },
);

const festivalSlice = createSlice({
  name: "festival",

  initialState: {
    festivals: [],
    festival: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchFestivals.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchFestivals.fulfilled, (state, action) => {
        state.loading = false;
        state.festivals = action.payload;
      })

      .addCase(fetchFestivals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchSingleFestival.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchSingleFestival.fulfilled, (state, action) => {
        state.loading = false;
        state.festival = action.payload.festival;
      })

      .addCase(fetchSingleFestival.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateFestival.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateFestival.fulfilled, (state, action) => {
        state.loading = false;
        state.festival = action.payload;
      })

      .addCase(updateFestival.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteFestival.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteFestival.fulfilled, (state, action) => {
        state.loading = false;

        state.festivals = state.festivals.filter(
          (festival) => festival._id !== action.payload,
        );
      })

      .addCase(deleteFestival.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default festivalSlice.reducer;
