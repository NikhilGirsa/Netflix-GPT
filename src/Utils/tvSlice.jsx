import { createSlice } from "@reduxjs/toolkit";

const tvSlice = createSlice({
  name: "tv",
  initialState: {
    airingTodayShows: null,
    onTheAirShows: null,
    popularShows: null,
    topRatedShows: null,
    tvTrailerVideo: null,
  },
  reducers: {
    addAiringTodayShows: (state, action) => {
      state.airingTodayShows = action.payload;
    },
    addOnTheAirShows: (state, action) => {
      state.onTheAirShows = action.payload;
    },
    addPopularShows: (state, action) => {
      state.popularShows = action.payload;
    },
    addTopRatedShows: (state, action) => {
      state.topRatedShows = action.payload;
    },
    addTVTrailerVideo: (state, action) => {
      state.tvTrailerVideo = action.payload;
    },
  },
});

export const {
  addAiringTodayShows,
  addOnTheAirShows,
  addPopularShows,
  addTopRatedShows,
  addTVTrailerVideo,
} = tvSlice.actions;

export default tvSlice.reducer;
