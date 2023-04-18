import {configureStore} from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import alertReducer from "./reducers/alertReducer";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    user: userReducer,
    alert: alertReducer,
  },
});
