import layoutReducer from "@_lib/redux/features/layoutSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    layout: layoutReducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export default store;
