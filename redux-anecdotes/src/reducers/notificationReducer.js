import { createSlice } from "@reduxjs/toolkit";

const initialState = { content: "", visible: false };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return { ...state, content: action.payload, visible: true };
    },
    clearNotification(state, action) {
      return { ...state, content: "", visible: false };
    },
  },
});

export const { showNotification, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
