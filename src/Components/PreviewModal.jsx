import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Play, Plus, ThumbsUp, Volume2, VolumeX } from "lucide-react";
import { closeModal } from "../Utils/modalSlice";
import { TMDB_API_OPTIONS, TMDB_BACKDROP_CDN } from "../Utils/tmdbConfig";

const PreviewModal = () => {
  const dispatch = useDispatch();
  const { isOpen, content, contentType } = useSelector((store) => store.modal);
  const [trailer, setTrailer] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (content && isOpen) {
      const fetchTrailer = async () => {
        try {
          const endpoint =
            contentType === "movie"
              ? `https://api.themoviedb.org/3/movie/${content.id}/videos?language=en-US`
              : `https://api.themoviedb.org/3/tv/${content.id}/videos?language=en-US`;

          const response = await fetch(endpoint, TMDB_API_OPTIONS);
          const json = await response.json();
          const trailers = json.results.filter(
            (video) => video.type === "Trailer"
          );
          setTrailer(trailers[0] || json.results[0]);
        } catch (error) {
          console.error("Error fetching trailer:", error);
        }
      };
      fetchTrailer();
    }
  }, [content, contentType, isOpen]);

  if (!isOpen || !content) return null;

  const title = content.title || content.name;
  const releaseDate = content.release_date || content.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl mx-4 bg-zinc-900 rounded-lg shadow-2xl overflow-hidden animate-fade-in">
        {/* Close Button */}
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-4 right-4 z-50 bg-zinc-900 rounded-full p-2 hover:bg-zinc-800 transition"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Video/Image Section */}
        <div className="relative w-full aspect-video">
          {trailer ? (
            <>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${
                  trailer.key
                }?autoplay=1&mute=${
                  isMuted ? 1 : 0
                }&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-4 right-4 bg-zinc-900/80 rounded-full p-3 hover:bg-zinc-800 transition"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            </>
          ) : (
            <img
              src={TMDB_BACKDROP_CDN + content.backdrop_path}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {title}
            </h2>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-white text-black py-2 px-6 rounded hover:bg-gray-200 transition font-semibold">
                <Play className="w-5 h-5" fill="black" />
                Play
              </button>
              <button className="bg-zinc-700/80 text-white p-2 rounded-full hover:bg-zinc-600 transition">
                <Plus className="w-6 h-6" />
              </button>
              <button className="bg-zinc-700/80 text-white p-2 rounded-full hover:bg-zinc-600 transition">
                <ThumbsUp className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-8 space-y-4">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-green-500 font-semibold">
              {Math.round(content.vote_average * 10)}% Match
            </span>
            <span className="text-gray-400">{year}</span>
            {contentType === "tv" && content.number_of_seasons && (
              <span className="text-gray-400">
                {content.number_of_seasons} Season
                {content.number_of_seasons > 1 ? "s" : ""}
              </span>
            )}
            <span className="border border-gray-500 px-2 py-0.5 text-gray-400 text-xs">
              HD
            </span>
          </div>

          <p className="text-gray-300 text-base leading-relaxed">
            {content.overview}
          </p>

          {content.genres && content.genres.length > 0 && (
            <div className="text-sm">
              <span className="text-gray-500">Genres: </span>
              <span className="text-gray-300">
                {content.genres.map((g) => g.name).join(", ")}
              </span>
            </div>
          )}

          {content.vote_average && (
            <div className="text-sm">
              <span className="text-gray-500">Rating: </span>
              <span className="text-gray-300">
                {content.vote_average.toFixed(1)}/10
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
