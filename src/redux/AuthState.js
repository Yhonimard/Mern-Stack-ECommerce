import { getCookie } from "cookies-next";

const { createSlice, current } = require("@reduxjs/toolkit");

const initialState = {
  isLogin: false,
  userData: {},
};

const AuthState = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isAuth(state, action) {
      state.isLogin = action.payload;
    },
    isUserdata(state, action) {
      state.userData = action.payload;
    },
  },
});

export const { isAuth, isUserdata } = AuthState.actions;

export default AuthState;
