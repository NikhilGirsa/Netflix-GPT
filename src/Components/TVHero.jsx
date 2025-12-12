import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TMDB_API_OPTIONS, TMDB_BACKDROP_CDN } from "../Utils/tmdbConfig";
import { addTVTrailerVideo } from "../Utils/tvSlice";
import { Play, Info } from "lucide-react";

const TVHero = () => {
  const dispatch = useDispatch();
  const tvShows = useSelector((store) => store.tv?.popularShows);
  const trailerVideo = useSelector((store) => store.tv?.tvTrailerVideo);

  const featuredShow = tvShows?.[0];

  useEffect(() => {
    if (featuredShow?.id && !trailerVideo) {
      const getShowVideos = async () => {
        try {
          console.log(
            "Fetching trailer for TV show:",
            featuredShow.name,
            featuredShow.id
          );
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${featuredShow.id}/videos?language=en-US`,
            TMDB_API_OPTIONS
          );
          const json = await response.json();
          console.log("TV show videos response:", json);
          const filterData = json.results?.filter(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );
          const trailer = filterData?.length
            ? filterData[0]
            : json.results?.[0];
          if (trailer) {
            console.log("Found trailer:", trailer);
            dispatch(addTVTrailerVideo(trailer));
          } else {
            console.log("No trailer found for this TV show");
          }
        } catch (error) {
          console.error("Error fetching TV show videos:", error);
        }
      };
      getShowVideos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featuredShow?.id]);

  if (!tvShows || !featuredShow) {
    return (
      <div className="w-full aspect-video bg-zinc-900 animate-pulse"></div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Video/Image Background */}
      <div className="w-full relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/10 via-transparent to-black z-10 pointer-events-none"></div>
        <div className="w-full aspect-video">
          {trailerVideo?.key ? (
            <iframe
              className="w-full h-full scale-150 origin-center"
              src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${trailerVideo.key}&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1`}
              title="Background trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              src={TMDB_BACKDROP_CDN + featuredShow.backdrop_path}
              alt={featuredShow.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Video Title */}
      <div className="absolute w-full aspect-video top-0 left-0 flex items-end pb-[15%] px-4 md:px-12 lg:px-16 bg-gradient-to-t from-black via-black/50 to-transparent">
        <div className="max-w-md md:max-w-xl lg:max-w-2xl z-10">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-5 text-white drop-shadow-2xl">
            {featuredShow.name}
          </h1>
          <p className="hidden md:block text-sm lg:text-lg mb-4 md:mb-6 line-clamp-3 text-white/90 drop-shadow-lg leading-relaxed">
            {featuredShow.overview}
          </p>
          <div className="flex gap-2 md:gap-3">
            <button className="flex items-center gap-1 md:gap-2 bg-white hover:bg-white/80 text-black py-1.5 md:py-2 lg:py-2.5 px-4 md:px-6 lg:px-8 text-sm md:text-base lg:text-lg font-semibold rounded transition">
              <Play className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 fill-current" />
              <span>Play</span>
            </button>
            <button className="flex items-center gap-1 md:gap-2 bg-gray-500/70 hover:bg-gray-500/50 text-white py-1.5 md:py-2 lg:py-2.5 px-4 md:px-6 lg:px-8 text-sm md:text-base lg:text-lg font-semibold rounded transition">
              <Info className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVHero;
