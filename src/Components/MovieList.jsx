import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className="group px-4 md:px-12 lg:px-16">
      <h2 className="text-base md:text-xl lg:text-2xl font-semibold text-white mb-2 md:mb-4 hover:text-gray-300 transition cursor-pointer">
        {title}
      </h2>
      <div className="relative">
        <div className="flex overflow-x-scroll overflow-y-visible scrollbar-hide gap-2 md:gap-3 pb-10 pt-2 px-12 -mx-12">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              title={movie.title}
              movieData={movie}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
