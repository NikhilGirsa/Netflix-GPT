import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import MovieList from "./MovieList";
import TVList from "./TVList";
import TrendingHero from "./TrendingHero";
import { TMDB_API_OPTIONS } from "../Utils/tmdbConfig";

const NewAndPopular = () => {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [trendingTV, setTrendingTV] = useState(null);
  const movies = useSelector((store) => store.movies);
  const tvShows = useSelector((store) => store.tv);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        // Fetch trending movies
        const moviesResponse = await fetch(
          "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
          TMDB_API_OPTIONS
        );
        const moviesJson = await moviesResponse.json();
        setTrendingMovies(moviesJson.results);

        // Fetch trending TV shows
        const tvResponse = await fetch(
          "https://api.themoviedb.org/3/trending/tv/week?language=en-US",
          TMDB_API_OPTIONS
        );
        const tvJson = await tvResponse.json();
        setTrendingTV(tvJson.results);
      } catch (error) {
        console.error("Error fetching trending content:", error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      {/* Hero Section with Trending Content */}
      <TrendingHero trendingMovies={trendingMovies} />
      <div className="bg-black pb-20">
        <div className="-mt-32 md:-mt-40 lg:-mt-52 relative z-20 space-y-8 md:space-y-12">
          <MovieList
            title="Trending Movies This Week"
            movies={trendingMovies}
          />
          <TVList title="Trending TV Shows This Week" shows={trendingTV} />
          <MovieList title="Popular Movies" movies={movies.popularMovies} />
          <TVList title="Popular TV Shows" shows={tvShows.popularShows} />
          <MovieList title="Upcoming Movies" movies={movies.upcomingMovies} />
        </div>
      </div>
    </div>
  );
};

export default NewAndPopular;
