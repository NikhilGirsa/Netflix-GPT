import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import tvReducer from "./tvSlice";
import searchReducer from "./searchSlice";
import myListReducer from "./myListSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    tv: tvReducer,
    search: searchReducer,
    myList: myListReducer,
  },
});

export default appStore;
