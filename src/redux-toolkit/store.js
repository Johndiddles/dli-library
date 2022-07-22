import { configureStore } from "@reduxjs/toolkit";
import moduleReducer from "./modulesSlice/moduleSlice";
import userReducer from "./userSlice/userSlice";

export const store = configureStore({
  reducer: {
    modules: moduleReducer,
    user: userReducer,
  },
});
