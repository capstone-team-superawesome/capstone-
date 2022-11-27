import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TOKEN = "token";

export const me = createAsyncThunk("auth/me", async () => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const res = await axios.get("/auth/me", {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    } else {
      return {};
    }
  } catch (error) {
    if (error.response.data) {
      return thunkAPI.rejectWithValue(error.response.data);
    } else {
      return "There was an issue with your request.";
    }
  }
});

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async ({ username, password, email, method }, thunkAPI) => {
    try {
      const res = await axios.post(`/auth/${method}`, {
        username,
        password,
        email,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      thunkAPI.dispatch(me());
    } catch (error) {
      if (error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return "There was an issue with your request.";
      }
    }
  }
);

export const editUser = createAsyncThunk(
  "editUser",
  async ({ id, updateEmail, updatePassword, profileImage, updateBio }) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      const { data } = await axios.put(
        `/api/users/${id}`,

        {
          email: updateEmail,
          password: updatePassword,
          profilePicture: profileImage,
          bio: updateBio,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchUser = createAsyncThunk("fetchUser", async (id) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const { data } = await axios.get(`api/users/${id}`, {
      headers: {
        authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updateDrawerTrue = createAsyncThunk(
  "updateDrawerTrue",
  async (id) => {
    try {
      const { data } = await axios.put(`api/users/${id}/updateDrawer`, {
        isDrawer: true,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateDrawerFalse = createAsyncThunk(
  "updateDrawerFalse",
  async (id) => {
    try {
      const { data } = await axios.put(`api/users/${id}/updateDrawer`, {
        isDrawer: false,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

/*
  SLICE
*/
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    me: {},
    error: null,
  },
  reducers: {
    logout(state, action) {
      window.localStorage.removeItem(TOKEN);
      state.me = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(me.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(me.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(updateDrawerTrue.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(updateDrawerFalse.fulfilled, (state, action) => {
      state.me = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
