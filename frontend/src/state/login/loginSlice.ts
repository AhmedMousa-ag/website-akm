import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IsLoggedState {
  isLoggedIn: boolean;
}

const isLoggedState: IsLoggedState = { isLoggedIn: false };

const isLoggedSlice = createSlice({
  name: "isLoggedState",
  initialState: isLoggedState,
  reducers: {
    toggleLoggedIn: (state) => {
      !state.isLoggedIn;
    },
    changeLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { toggleLoggedIn, changeLoggedIn } = isLoggedSlice.actions;
export default isLoggedSlice.reducer;
