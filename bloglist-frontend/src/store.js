import {configureStore} from "@reduxjs/toolkit";
import blogReducer from "./data/reducers/blogReducer";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});
