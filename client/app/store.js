import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import HomeReducer from "../features/home/HomeSlice";
import gameReducer from "../features/game/gameSlice";

const store = configureStore({
  reducer: { auth: authReducer, home: HomeReducer, game: gameReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
export * from "../features/home/HomeSlice";
export * from "../features/game/gameSlice";
