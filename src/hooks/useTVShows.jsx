import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TMDB_API_OPTIONS } from "../Utils/tmdbConfig";
import {
  addAiringTodayShows,
  addOnTheAirShows,
  addPopularShows,
  addTopRatedShows,
} from "../Utils/tvSlice";

// Custom hook to fetch Airing Today TV shows
export const useAiringTodayShows = () => {
  const dispatch = useDispatch();

  const getAiringTodayShows = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1",
        TMDB_API_OPTIONS
      );
      const json = await response.json();
      dispatch(addAiringTodayShows(json.results));
    } catch (error) {
      console.error("Error fetching airing today shows:", error);
    }
  };

  useEffect(() => {
    getAiringTodayShows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// Custom hook to fetch On The Air TV shows
export const useOnTheAirShows = () => {
  const dispatch = useDispatch();

  const getOnTheAirShows = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
        TMDB_API_OPTIONS
      );
      const json = await response.json();
      dispatch(addOnTheAirShows(json.results));
    } catch (error) {
      console.error("Error fetching on the air shows:", error);
    }
  };

  useEffect(() => {
    getOnTheAirShows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// Custom hook to fetch Popular TV shows
export const usePopularShows = () => {
  const dispatch = useDispatch();

  const getPopularShows = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
        TMDB_API_OPTIONS
      );
      const json = await response.json();
      dispatch(addPopularShows(json.results));
    } catch (error) {
      console.error("Error fetching popular shows:", error);
    }
  };

  useEffect(() => {
    getPopularShows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// Custom hook to fetch Top Rated TV shows
export const useTopRatedShows = () => {
  const dispatch = useDispatch();

  const getTopRatedShows = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
        TMDB_API_OPTIONS
      );
      const json = await response.json();
      dispatch(addTopRatedShows(json.results));
    } catch (error) {
      console.error("Error fetching top rated shows:", error);
    }
  };

  useEffect(() => {
    getTopRatedShows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
