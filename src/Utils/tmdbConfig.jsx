// TMDB API Configuration
// Get your API key and Access Token from: https://www.themoviedb.org/settings/api

export const TMDB_API_KEY = "YOUR_TMDB_API_KEY";
export const TMDB_ACCESS_TOKEN = "YOUR_TMDB_ACCESS_TOKEN_HERE";

export const TMDB_API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
};

export const TMDB_IMG_CDN = "https://image.tmdb.org/t/p/w500";
export const TMDB_BACKDROP_CDN = "https://image.tmdb.org/t/p/original";
