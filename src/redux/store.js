import { configureStore } from "@reduxjs/toolkit";
import AuthState from "./AuthState";
import cartState from "./CartState";

const store = configureStore({
  reducer: {
    auth: AuthState.reducer,
    cart: cartState.reducer,
  },
});

export default store;
