import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { TMDB_IMG_CDN, TMDB_API_OPTIONS } from "../Utils/tmdbConfig";
import { openModal } from "../Utils/modalSlice";
import {
  Play,
  Plus,
  ThumbsUp,
  ChevronDown,
  Volume2,
  VolumeX,
} from "lucide-react";

const TVCard = ({ posterPath, name, showData }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const hoverTimeoutRef = useRef(null);
  const playerRef = useRef(null);

  if (!posterPath) return null;

  useEffect(() => {
    if (isHovered && showData?.id && !trailerKey) {
      fetchTrailer();
    }
  }, [isHovered, showData?.id]);

  const fetchTrailer = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${showData.id}/videos?language=en-US`,
        TMDB_API_OPTIONS
      );
      const data = await response.json();
      const trailer = data.results?.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(false);
    setTrailerKey(null);
  };

  const handleClick = () => {
    dispatch(openModal({ content: showData, contentType: "tv" }));
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative w-48 flex-shrink-0 transition-all duration-300 ease-in-out origin-left"
      style={{
        transform: isHovered ? "scale(1.5)" : "scale(1)",
        zIndex: isHovered ? 50 : 1,
        marginRight: isHovered ? "6rem" : "0",
      }}
    >
      <div className="relative rounded-md overflow-hidden shadow-xl bg-zinc-900">
        {!isHovered || !trailerKey ? (
          <img
            src={TMDB_IMG_CDN + posterPath}
            alt={name}
            className="w-full h-auto object-cover"
          />
        ) : (
          <div className="relative w-full aspect-[2/3]">
            <iframe
              ref={playerRef}
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${
                isMuted ? 1 : 0
              }&controls=0&loop=1&playlist=${trailerKey}&modestbranding=1&rel=0`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={name}
            />
          </div>
        )}

        {isHovered && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4">
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={handleClick}
                className="bg-white hover:bg-gray-200 text-black rounded-full p-2 transition"
              >
                <Play className="w-4 h-4 fill-current" />
              </button>
              <button className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-full p-2 transition">
                <Plus className="w-4 h-4" />
              </button>
              <button className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-full p-2 transition">
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                onClick={handleClick}
                className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-full p-2 transition ml-auto"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              {trailerKey && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-full p-2 transition"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
            <h3 className="text-white font-semibold text-sm truncate">
              {name}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default TVCard;
