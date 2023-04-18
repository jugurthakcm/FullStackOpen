import {createSlice} from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      return {...state, user: action.payload};
    },
    logoutUser(state, action) {
      return {...state, user: null};
    },
  },
});

export const {loginUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;
