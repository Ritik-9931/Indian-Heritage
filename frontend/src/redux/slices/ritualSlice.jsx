import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import api from "../../services/api";



// GET RITUALS
export const fetchRituals =
  createAsyncThunk(
    "ritual/fetchRituals",

    async (_, thunkAPI) => {

      try {

        const response =
          await api.get("/rituals");



        return response.data.rituals;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response.data.message
        );
      }
    }
  );



// CREATE RITUAL
export const createRitual =
  createAsyncThunk(
    "ritual/createRitual",

    async (
      ritualData,
      thunkAPI
    ) => {

      try {

        const token =
          thunkAPI.getState().auth
            .token;



        const response =
          await api.post(
            "/rituals",
            ritualData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );



        return response.data.ritual;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response.data.message
        );
      }
    }
  );



const ritualSlice = createSlice({
  name: "ritual",

  initialState: {
    rituals: [],

    loading: false,

    error: null,
  },



  reducers: {},



  extraReducers: (builder) => {

    builder



      // FETCH
      .addCase(
        fetchRituals.pending,
        (state) => {

          state.loading = true;
        }
      )



      .addCase(
        fetchRituals.fulfilled,
        (state, action) => {

          state.loading = false;

          state.rituals =
            action.payload;
        }
      )



      .addCase(
        fetchRituals.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;
        }
      )



      // CREATE
      .addCase(
        createRitual.pending,
        (state) => {

          state.loading = true;
        }
      )



      .addCase(
        createRitual.fulfilled,
        (state, action) => {

          state.loading = false;

          state.rituals.unshift(
            action.payload
          );
        }
      )



      .addCase(
        createRitual.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;
        }
      );
  },
});



export default ritualSlice.reducer;