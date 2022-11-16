import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import editProfilePageSliceReducer from "../features/editprofile/EditProfilePageSlice";

const store = configureStore({
  reducer: { auth: authReducer, editProfilePage: editProfilePageSliceReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
