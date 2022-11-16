import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editProfilePicture = createAsyncThunk(
  "editProfilePicture",
  async () => {
    try {
      //waiting for api backend
      //const { data } = await axios.put(`/api/products`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const editProfilePageSlice = createSlice({
  name: "editProfilePage",
  initialState: {
    pictures: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(editProfilePicture.fulfilled, (state, action) => {
      state.pictures = action.payload;
    });
  },
});

export default editProfilePageSlice.reducer;
