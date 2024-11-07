import { configureStore } from "@reduxjs/toolkit";
import isLoggedInReducer from "./login/loginSlice";
import { loginApiSlice } from "./login/loginApiSlice";
import postSliceReduce from "./history/historySlice";
import isEditingReduce from "./basePage";

export const store = configureStore({
  reducer: {
    isLoggedIn: isLoggedInReducer,
    [loginApiSlice.reducerPath]: loginApiSlice.reducer,
    postsState: postSliceReduce,
    isEditing: isEditingReduce,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(loginApiSlice.middleware);
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
