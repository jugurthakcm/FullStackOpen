import {createSlice} from "@reduxjs/toolkit";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    getBlogs(state, action) {
      return [...action.payload];
    },
    addBlog(state, action) {
      return [...state, action.payload];
    },
    deleteBlog(state, action) {
      const id = action.payload;
      const filteredBlog = state.filter((blog) => blog.id !== id);

      return [...filteredBlog];
    },
  },
});

export const {getBlogs} = blogSlice.actions;
export default blogSlice.reducer;
