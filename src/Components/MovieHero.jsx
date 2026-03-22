import { useSelector } from "react-redux";
import { useMovieTrailer } from "../hooks/useMovies";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Background3D from "./Background3D";

const MovieHero = () => {
  const movies = useSelector((store) => store.movies?.popularMovies);
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  const featuredMovie = movies ? movies[0] : null;
  const id = featuredMovie?.id;

  // Fetch trailer for featured movie
  useMovieTrailer(id);

  if (!movies || !featuredMovie) return null;

  const { original_title, overview } = featuredMovie;

  return (
    <div className="relative w-full">
      <Background3D />
      {/* Video Background */}
      <div className="w-full relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
        <iframe
          className="w-full aspect-video"
          src={
            trailerVideo?.key
              ? `https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${trailerVideo.key}&modestbranding=1&playsinline=1`
              : ""
          }
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      {/* Video Title */}
      <div className="absolute w-full top-0 left-0 h-full flex flex-col justify-center px-6 md:px-16 bg-gradient-to-r from-black/95 via-black/70 to-transparent">
        <div className="max-w-xl md:max-w-2xl mt-16 md:mt-20">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-2xl"
          >
            {original_title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block text-sm md:text-base lg:text-lg mb-6 line-clamp-3 text-gray-100 drop-shadow-2xl font-normal"
          >
            {overview}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-3"
          >
            <button className="flex items-center gap-2 bg-white text-black py-2 md:py-3 px-6 md:px-8 text-sm md:text-lg font-semibold rounded hover:bg-opacity-80 transition hover-glow">
              <span className="text-xl">▶</span>
              <span>Play</span>
            </button>
            <button className="hidden md:flex items-center gap-2 bg-gray-500 bg-opacity-70 text-white py-2 md:py-3 px-6 md:px-8 text-sm md:text-lg font-semibold rounded hover:bg-opacity-50 transition glass-panel">
              <span className="text-xl">ℹ</span>
              <span>More Info</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;
