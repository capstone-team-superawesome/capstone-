import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import HomeReducer from "../features/home/HomeSlice";

const store = configureStore({
  reducer: { auth: authReducer, home: HomeReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
export * from "../features/home/HomeSlice";
