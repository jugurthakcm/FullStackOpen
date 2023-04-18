import {createSlice} from "@reduxjs/toolkit";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    getBlogs(state, action) {
     
      return [...state, ...action.payload];
    },
  },
});

export const {getBlogs} = blogSlice.actions;
export default blogSlice.reducer;
