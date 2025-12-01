import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TMDB_API_OPTIONS } from "../Utils/tmdbConfig";
import { addTrailerVideo } from "../Utils/movieSlice";

const TrendingHero = ({ trendingMovies }) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  const featuredContent = trendingMovies?.[0];

  useEffect(() => {
    if (featuredContent?.id) {
      const getVideos = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${featuredContent.id}/videos?language=en-US`,
            TMDB_API_OPTIONS
          );
          const json = await response.json();
          const filterData = json.results.filter(
            (video) => video.type === "Trailer"
          );
          const trailer = filterData.length ? filterData[0] : json.results[0];
          dispatch(addTrailerVideo(trailer));
        } catch (error) {
          console.error("Error fetching videos:", error);
        }
      };
      getVideos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featuredContent?.id]);

  if (!trendingMovies) return null;

  return (
    <div className="relative w-full">
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
          <div className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold inline-block mb-3">
            TRENDING NOW
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-2xl">
            {featuredContent.title}
          </h1>
          <p className="hidden md:block text-sm md:text-base lg:text-lg mb-6 line-clamp-3 text-gray-100 drop-shadow-2xl font-normal">
            {featuredContent.overview}
          </p>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white text-black py-2 md:py-3 px-6 md:px-8 text-sm md:text-lg font-semibold rounded hover:bg-opacity-80 transition">
              <span className="text-xl">▶</span>
              <span>Play</span>
            </button>
            <button className="hidden md:flex items-center gap-2 bg-gray-500 bg-opacity-70 text-white py-2 md:py-3 px-6 md:px-8 text-sm md:text-lg font-semibold rounded hover:bg-opacity-50 transition">
              <span className="text-xl">ℹ</span>
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingHero;
