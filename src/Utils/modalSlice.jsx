import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    content: null,
    contentType: null, // 'movie' or 'tv'
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.content = action.payload.content;
      state.contentType = action.payload.contentType;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = null;
      state.contentType = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
