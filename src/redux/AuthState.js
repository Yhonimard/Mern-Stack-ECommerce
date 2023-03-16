import { getCookie } from "cookies-next";

const { createSlice, current } = require("@reduxjs/toolkit");

const initialState = {
  isLogin: false,
  userData: {},
  userCartData: {},
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
    isUserCartData(state, action) {
      state.userCartData = action.payload;
    },
  },
});

export const { isAuth, isUserdata, isUserCartData } = AuthState.actions;

export default AuthState;
