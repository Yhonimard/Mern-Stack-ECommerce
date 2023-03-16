import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showToast: {
    title: "",
    status: "success",
    show: false,
  },
};

const GlobalState = createSlice({
  name: "global",
  initialState,
  reducers: {
    showToastHandler(state, action) {
      const { title, status, show } = action.payload;

      state.showToast = {
        show,
        title,
        status,
      };
    },
  },
});

export const { showToastHandler } = GlobalState.actions;

export default GlobalState;
