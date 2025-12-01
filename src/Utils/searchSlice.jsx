import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResults: null,
    searchQuery: "",
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearch: (state) => {
      state.searchResults = null;
      state.searchQuery = "";
    },
  },
});

export const { setSearchResults, setSearchQuery, clearSearch } =
  searchSlice.actions;

export default searchSlice.reducer;
