import { configureStore } from "@reduxjs/toolkit";
import keyReducer from "./slices/keyword";
import blogReducer from "./slices/blog-slice";
import userReducer from "./slices/user-slice";
import eventReducer from "./slices/event-slice";

export const store = configureStore({
  reducer: {
    keyword: keyReducer,
    blog_post: blogReducer,
    user: userReducer,
    event: eventReducer,
  },
});

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
