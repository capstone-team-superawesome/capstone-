import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TOKEN = "token";

export const fetchAllPrompts = createAsyncThunk("fetchAllPrompts", async () => {
  try {
    const { data } = await axios.get(`api/prompts`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const setPrompts = createAsyncThunk("setPrompts", async () => {
  try {
    const { data } = await axios.get(`api/prompts`);
    //console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchCurrentPrompt = createAsyncThunk(
  "fetchCurrentPrompt",
  async () => {
    try {
      const { data } = await axios.get(`api/prompts`);
      //console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

/*
  SLICE
*/
export const gameSlice = createSlice({
  name: "game",
  initialState: {
    prompts: [],
    currentPrompt: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPrompts.fulfilled, (state, action) => {
      state.prompts = action.payload;
    });
  },
});

export default gameSlice.reducer;
