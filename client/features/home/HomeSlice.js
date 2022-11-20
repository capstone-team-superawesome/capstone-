import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createdGameCode: "",
  inputtedGameCode: "",
};

const HomeSlice = createSlice({
  name: "gameCode",
  initialState,
  reducers: {
    makeGameCode: (state, action) => {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (let i = 0; i < action.payload; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      window.localStorage.setItem("gameCode", result);
      state.createdGameCode = result;
    },
    updateInputtedGameCode: (state, action) => {
      state.inputtedGameCode = action.payload;
    },
  },
});

export const { makeGameCode, updateInputtedGameCode } = HomeSlice.actions;

export default HomeSlice.reducer;
