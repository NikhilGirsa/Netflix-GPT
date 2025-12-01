// TMDB API Configuration
// Get your API key and Access Token from: https://www.themoviedb.org/settings/api

export const TMDB_API_KEY = "37a7762886a212af5dffa1aa20526c1e";
export const TMDB_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzN2E3NzYyODg2YTIxMmFmNWRmZmExYWEyMDUyNmMxZSIsIm5iZiI6MTc2NDU1MTY5MC42Mywic3ViIjoiNjkyY2VjMGE3ZDMxNWM0MzczMTEzZTQ1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.sV6v_Huh_Qb7S72-7IrmpgTtHQS0KWMDEvA3rRZJp1Q";

export const TMDB_API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
};

export const TMDB_IMG_CDN = "https://image.tmdb.org/t/p/w500";
export const TMDB_BACKDROP_CDN = "https://image.tmdb.org/t/p/original";
