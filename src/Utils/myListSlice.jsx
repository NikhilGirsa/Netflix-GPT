import { createSlice } from "@reduxjs/toolkit";

const myListSlice = createSlice({
  name: "myList",
  initialState: {
    items: JSON.parse(localStorage.getItem("myList")) || [],
  },
  reducers: {
    addToMyList: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem("myList", JSON.stringify(state.items));
      }
    },
    removeFromMyList: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("myList", JSON.stringify(state.items));
    },
  },
});

export const { addToMyList, removeFromMyList } = myListSlice.actions;

export default myListSlice.reducer;
