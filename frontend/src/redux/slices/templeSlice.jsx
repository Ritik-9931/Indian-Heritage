import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/Api";

export const fetchTemples = createAsyncThunk(
  "temple/fetchTemples",

  async (
    { page = 1, keyword = "", state = "", city = "", deity = "" },
    thunkAPI,
  ) => {
    try {
      let query = `/temples?page=${page}`;

      if (keyword) {
        query += `&keyword=${keyword}`;
      }

      if (state) {
        query += `&state=${state}`;
      }

      if (city) {
        query += `&city=${city}`;
      }

      if (deity) {
        query += `&deity=${deity}`;
      }

      const response = await api.get(query);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const fetchTempleById = createAsyncThunk(
  "temple/fetchTempleById",

  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`/temples/${id}`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch temple",
      );
    }
  },
);

export const createTemple = createAsyncThunk(
  "temple/createTemple",

  async (FormData, thunkAPI) => {
    try {
      const { data } = await api.post("/temples", FormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create temple",
      );
    }
  },
);

export const addTempleReview = createAsyncThunk(
  "temple/addTempleReview",

  async ({ id, rating, comment }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const { data } = await api.post(
        `/temples/${id}/review`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data.temple;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add review",
      );
    }
  },
);

export const deleteTempleReview = createAsyncThunk(
  "temple/deleteTempleReview",

  async ({ id, reviewId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const { data } = await api.delete(`/temples/${id}/review/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data.temple;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete review",
      );
    }
  },
);

const templeSlice = createSlice({
  name: "temple",

  initialState: {
    temples: [],
    temple: null,
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchTemples.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchTemples.fulfilled, (state, action) => {
        state.loading = false;
        state.temples = action.payload;
      })

      .addCase(fetchTemples.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchTempleById.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(fetchTempleById.fulfilled, (state, action) => {
        state.loading = false;

        state.temple = action.payload.temple;
      })

      .addCase(fetchTempleById.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });

    builder
      .addCase(createTemple.pending, (state) => {
        state.loading = true;

        state.error = null;

        state.success = false;
      })

      .addCase(createTemple.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.temples.unshift(action.payload);
      })

      .addCase(createTemple.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });

    builder
      .addCase(addTempleReview.fulfilled, (state, action) => {
        state.temple = action.payload;
      })

      .addCase(deleteTempleReview.fulfilled, (state, action) => {
        state.temple = action.payload;
      });
  },
});

export default templeSlice.reducer;
