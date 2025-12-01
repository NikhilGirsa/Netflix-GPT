import { useEffect, useState } from "react";
import { TMDB_API_OPTIONS } from "../Utils/tmdbConfig";

// Hook to fetch movies by genre
export const useMoviesByGenre = (genreId) => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&with_genres=${genreId}&sort_by=popularity.desc`,
          TMDB_API_OPTIONS
        );
        const json = await response.json();
        setMovies(json.results);
      } catch (error) {
        console.error(`Error fetching movies for genre ${genreId}:`, error);
      }
    };

    if (genreId) fetchMoviesByGenre();
  }, [genreId]);

  return movies;
};

// Hook to fetch TV shows by genre
export const useTVShowsByGenre = (genreId) => {
  const [shows, setShows] = useState(null);

  useEffect(() => {
    const fetchTVShowsByGenre = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/tv?language=en-US&page=1&with_genres=${genreId}&sort_by=popularity.desc`,
          TMDB_API_OPTIONS
        );
        const json = await response.json();
        setShows(json.results);
      } catch (error) {
        console.error(`Error fetching TV shows for genre ${genreId}:`, error);
      }
    };

    if (genreId) fetchTVShowsByGenre();
  }, [genreId]);

  return shows;
};

// TMDB Genre IDs
export const MOVIE_GENRES = {
  ACTION: 28,
  COMEDY: 35,
  HORROR: 27,
  ROMANCE: 10749,
  THRILLER: 53,
  SCIFI: 878,
  ANIMATION: 16,
  DOCUMENTARY: 99,
  DRAMA: 18,
  CRIME: 80,
};

export const TV_GENRES = {
  ACTION: 10759,
  COMEDY: 35,
  DRAMA: 18,
  SCIFI: 10765,
  CRIME: 80,
  DOCUMENTARY: 99,
  KIDS: 10762,
  MYSTERY: 9648,
  REALITY: 10764,
  ANIMATION: 16,
};
