import { useSelector } from "react-redux";
import Header from "./Header";
import MovieList from "./MovieList";
import MovieHero from "./MovieHero";
import PreviewModal from "./PreviewModal";
import {
  useNowPlayingMovies,
  usePopularMovies,
  useTopRatedMovies,
  useUpcomingMovies,
} from "../hooks/useMovies";
import { useMoviesByGenre, MOVIE_GENRES } from "../hooks/useGenres";

const Movies = () => {
  const movies = useSelector((store) => store.movies);

  // Fetch all movie data
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  // Fetch genre-specific movies
  const actionMovies = useMoviesByGenre(MOVIE_GENRES.ACTION);
  const comedyMovies = useMoviesByGenre(MOVIE_GENRES.COMEDY);
  const horrorMovies = useMoviesByGenre(MOVIE_GENRES.HORROR);
  const romanceMovies = useMoviesByGenre(MOVIE_GENRES.ROMANCE);
  const scifiMovies = useMoviesByGenre(MOVIE_GENRES.SCIFI);
  const animationMovies = useMoviesByGenre(MOVIE_GENRES.ANIMATION);
  const documentaries = useMoviesByGenre(MOVIE_GENRES.DOCUMENTARY);

  return (
    <div className="bg-black min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      {/* Hero Section with Featured Movie */}
      <MovieHero />
      <div className="bg-black pb-20">
        <div className="-mt-32 md:-mt-40 lg:-mt-52 relative z-20 space-y-8 md:space-y-12">
          <MovieList
            title="Now Playing in Theaters"
            movies={movies.nowPlayingMovies}
          />
          <MovieList title="Action & Adventure" movies={actionMovies} />
          <MovieList title="Comedies" movies={comedyMovies} />
          <MovieList title="Horror Movies" movies={horrorMovies} />
          <MovieList title="Romantic Movies" movies={romanceMovies} />
          <MovieList title="Sci-Fi Movies" movies={scifiMovies} />
          <MovieList title="Animated Movies" movies={animationMovies} />
          <MovieList title="Documentaries" movies={documentaries} />
          <MovieList title="Popular Movies" movies={movies.popularMovies} />
          <MovieList title="Top Rated Movies" movies={movies.topRatedMovies} />
          <MovieList title="Coming Soon" movies={movies.upcomingMovies} />
        </div>
      </div>
      <PreviewModal />
    </div>
  );
};

export default Movies;
