import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IsOpenModal {
  isOpenModal: boolean;
}

const isOpenModalState: IsOpenModal = { isOpenModal: false };

const isOpenModalSlice = createSlice({
  name: "isOpenModal",
  initialState: isOpenModalState,
  reducers: {
    toggleOpenModal: (state) => {
      !state.isOpenModal;
    },
    changeOpenModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload;
    },
  },
});

export const { toggleOpenModal, changeOpenModal } = isOpenModalSlice.actions;
export default isOpenModalSlice.reducer;
