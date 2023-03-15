import { configureStore } from "@reduxjs/toolkit";
import AuthState from "./AuthState";

const store = configureStore({
  reducer: {
    auth: AuthState.reducer,
  },
});

export default store;
