import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../../services/api";



export const fetchDeities =
  createAsyncThunk(
    "deity/fetchDeities",

    async (_, thunkAPI) => {
      try {

        const response = await api.get(
          "/deities"
        );

        return response.data.deities;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response.data.message
        );
      }
    }
  );



const deitySlice = createSlice({
  name: "deity",

  initialState: {
    deities: [],
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
      });
  },
});

export default deitySlice.reducer;