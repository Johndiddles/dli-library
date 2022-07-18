import { configureStore } from "@reduxjs/toolkit";
import moduleReducer from "./modulesSlice/moduleSlice";

export const store = configureStore({
  reducer: {
    modules: moduleReducer,
  },
});
