import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TOKEN = "token";

export const makeSession = createAsyncThunk(
  "makeSession",
  async ({ gameCode, isInSession, promptList, round }) => {
    try {
      const { data } = await axios.post(`api/gameSession`, {
        gameCode,
        isInSession,
        promptList,
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

export const updateGameSession = createAsyncThunk(
  "updateGameSession",
  async ({ gameCode, isInSession, promptList, round }) => {
    try {
      const { data } = await axios.put(`api/gameSession`, {
        isInSession,
        promptList,
        round,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchPromptList = createAsyncThunk(
  "fetchPromptList",
  async ({ createdGameCode }) => {
    try {
      const { data } = await axios.get(`api/gameSession/${createdGameCode}`);
      console.log("When we fetch promptlist :", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const setInSessionFalse = createAsyncThunk(
  "setInSessionFalse",
  async () => {
    try {
      //to make InSessionFalse
      const { data } = await axios.put(`api/gameSession`, {});
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
    gameSession: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(makeSession.fulfilled, (state, action) => {
      state.gameSession = action.payload;
    });
    builder.addCase(updateGameSession.fulfilled, (state, action) => {
      state.gameSession = action.payload;
    });
    builder.addCase(fetchAllPrompts.fulfilled, (state, action) => {
      state.prompts = action.payload;
    });
    builder.addCase(fetchPromptList.fulfilled, (state, action) => {
      console.log("Action.payload in slice: ", action.payload);
      state.gameSession = action.payload;
    });
    builder.addCase(setInSessionFalse.fulfilled, (state, action) => {
      state.gameSession = action.payload;
    });
  },
});

export default gameSlice.reducer;
