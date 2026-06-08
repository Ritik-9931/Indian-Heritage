import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import Api from "../../services/Api";




// FETCH TEMPLE REVIEWS
export const fetchTempleReviews =
  createAsyncThunk(
    "review/fetchTempleReviews",

    async (templeId, thunkAPI) => {
      try {

        const response = await Api.get(
          `/reviews/temple/${templeId}`
        );

        return response.data.reviews;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response.data.message
        );
      }
    }
  );



// CREATE REVIEW
export const createReview =
  createAsyncThunk(
    "review/createReview",

    async (reviewData, thunkAPI) => {
      try {

        const token =
          thunkAPI.getState().auth.token;



        const response = await Api.post(
          "/reviews",
          reviewData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );



        return response.data.review;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response.data.message
        );
      }
    }
  );



const reviewSlice = createSlice({
  name: "review",

  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchTempleReviews.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchTempleReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })

      .addCase(fetchTempleReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })

      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;

        state.reviews.unshift(action.payload);
      })

      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;