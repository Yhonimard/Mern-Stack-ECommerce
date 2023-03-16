import { configureStore } from "@reduxjs/toolkit";
import AuthState from "./AuthState";
import GlobalState from "./GlobalState";

const store = configureStore({
  reducer: {
    auth: AuthState.reducer,
    global: GlobalState.reducer,
  },
});

export default store;
