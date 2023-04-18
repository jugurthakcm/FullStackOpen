import {createSlice} from "@reduxjs/toolkit";

const initialState = {};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showSuccessMessage(state, action) {
      return {...state, successMessage: action.payload};
    },
    showErrorMessage(state, action) {
      return {...state, errorMessage: action.payload};
    },
    clearAlert(state, action) {
      return {...state, successMessage: null, errorMessage: null};
    },
  },
});

export const {showAlert, clearAlert} = alertSlice.actions;
export default alertSlice.reducer;
