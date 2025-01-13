import { configureStore } from "@reduxjs/toolkit";
import isLoggedInReducer from "./login/loginSlice";
import { loginApiSlice } from "./login/loginApiSlice";
import postSliceReduce from "./posts/postsSlice";
import isEditingReduce from "./basePage";
import isOpenReducer from "./modals/verifySlice";

export const store = configureStore({
  reducer: {
    isLoggedIn: isLoggedInReducer,
    [loginApiSlice.reducerPath]: loginApiSlice.reducer,
    postsState: postSliceReduce,
    isEditing: isEditingReduce,
    isOpenModal: isOpenReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(loginApiSlice.middleware);
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
