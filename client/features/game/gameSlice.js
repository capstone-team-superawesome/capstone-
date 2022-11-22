import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TOKEN = "token";

export const fetchPrompts = createAsyncThunk("fetchPrompts", async () => {
  try {
    const { data } = await axios.get(`api/prompts`);
    //console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

/*
  SLICE
*/
export const gameSlice = createSlice({
  name: "game",
  initialState: {
    prompts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPrompts.fulfilled, (state, action) => {
      state.prompts = action.payload;
    });
  },
});

export default gameSlice.reducer;
