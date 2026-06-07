import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// GET PROFILE
export const getProfile = createAsyncThunk(
  "user/getProfile",

  async (token, thunkAPI) => {
    try {
      const { data } = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data.user || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile",
      );
    }
  },
);

// ADD FAVORITE TEMPLE
export const addFavoriteTemple = createAsyncThunk(
  "user/addFavoriteTemple",
  async (templeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const { data } = await api.put(
        `/users/favorite/${templeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed",
      );
    }
  },
);

// ADD VISITED TEMPLE
export const addVisitedTemple = createAsyncThunk(
  "user/addVisitedTemple",
  async (templeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const { data } = await api.put(
        `/users/visited/${templeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed",
      );
    }
  },
);

// REMOVE FAVORITE
export const removeFavoriteTemple = createAsyncThunk(
  "user/removeFavoriteTemple",
  async (templeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const { data } = await api.delete(`/users/favorite/${templeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed",
      );
    }
  },
);

// REMOVE VISITED
export const removeVisitedTemple = createAsyncThunk(
  "user/removeVisitedTemple",
  async (templeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const { data } = await api.delete(`/users/visited/${templeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed",
      );
    }
  },
);

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",

  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",

  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const response = await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        id,
        message: response.data.message,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete user",
      );
    }
  },
);

export const updateUserRole = createAsyncThunk(
  "user/updateUserRole",

  async ({ id, role }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const response = await api.put(
        `/users/${id}/role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return {
        id,
        role,
        message: response.data.message,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to upload role",
      );
    }
  },
);

const userSlice = createSlice({
  name: "user",

  initialState: {
    users: [],
    user: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET PROFILE
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FAVORITE + VISITED COMMON
      .addCase(addFavoriteTemple.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(addVisitedTemple.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(removeFavoriteTemple.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(removeVisitedTemple.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // FETCH USERS
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE USER
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;

        state.users = state.users.filter(
          (user) => user._id !== action.payload.id,
        );

        state.success = action.payload.message;
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE ROLE
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;

        const user = state.users.find((u) => u._id === action.payload.id);

        if (user) {
          user.role = action.payload.role;
        }

        state.success = action.payload.message;
      })

      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
