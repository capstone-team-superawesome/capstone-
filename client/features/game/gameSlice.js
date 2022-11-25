import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TOKEN = "token";

export const makeSession = createAsyncThunk(
  "makeSession",
  async ({ gameCode, isInSession, currentPrompt, round }) => {
    try {
      const { data } = await axios.post(`api/gameSession`, {
        gameCode,
        isInSession,
        currentPrompt,
        round,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAllPrompts = createAsyncThunk("fetchAllPrompts", async () => {
  try {
    const { data } = await axios.get(`api/prompts`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const setCurrentPrompt = createAsyncThunk(
  "setCurrentPrompt",
  async () => {
    try {
      const { data } = await axios.put(`api/gameSession`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchCurrentPrompt = createAsyncThunk(
  "fetchCurrentPrompt",
  async ({ createdGameCode }) => {
    try {
      console.log("hello");
      console.log("createdGameCode SLICE", createdGameCode);
      const { data } = await axios.get(`api/gameSession/${createdGameCode}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const setGameCode = createAsyncThunk("setGameCode", async () => {
  try {
    const { data } = await axios.put(`api/gameSession`);
    //console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const setInSession = createAsyncThunk("setInSession", async () => {
  try {
    const { data } = await axios.put(`api/gameSession`);
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
    currentPrompt: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setCurrentPrompt.fulfilled, (state, action) => {
      state.prompts = action.payload;
    });
    builder.addCase(fetchAllPrompts.fulfilled, (state, action) => {
      state.prompts = action.payload;
    });
    builder.addCase(fetchCurrentPrompt.fulfilled, (state, action) => {
      state.currentPrompt = action.payload;
    });
    builder.addCase(setGameCode.fulfilled, (state, action) => {
      state.prompts = action.payload;
    });
    builder.addCase(setInSession.fulfilled, (state, action) => {
      state.prompts = action.payload;
    });
  },
});

export default gameSlice.reducer;
