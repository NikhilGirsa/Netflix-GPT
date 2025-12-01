import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className="px-4 md:px-12 lg:px-16">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-3 md:mb-4">
        {title}
      </h2>
      <div className="flex overflow-x-scroll scrollbar-hide pb-2">
        <div className="flex gap-2 md:gap-3">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              title={movie.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
