import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="bg-black">
      <div className="-mt-20 md:-mt-32 lg:-mt-40 relative z-20 pb-12 md:pb-20">
        <div className="space-y-6 md:space-y-10 lg:space-y-12">
          <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
          <MovieList title="Trending Now" movies={movies.popularMovies} />
          <MovieList title="Top Rated" movies={movies.topRatedMovies} />
          <MovieList title="Upcoming" movies={movies.upcomingMovies} />
        </div>
      </div>
    </div>
  );
};

export default SecondaryContainer;
