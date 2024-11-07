import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface isEditing {
  isEditing: boolean;
}

const isEditing: isEditing = { isEditing: false };

const isEditingSlice = createSlice({
  name: "isEditing",
  initialState: isEditing,
  reducers: {
    toggleIsEditing: (state) => {
      state.isEditing = !state.isEditing;
    },
    changeIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
  },
});

export const { toggleIsEditing, changeIsEditing } = isEditingSlice.actions;
export default isEditingSlice.reducer;
