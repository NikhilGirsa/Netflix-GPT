import { useDispatch } from "react-redux";
import { TMDB_IMG_CDN } from "../Utils/tmdbConfig";
import { openModal } from "../Utils/modalSlice";

const MovieCard = ({ posterPath, title, movieData }) => {
  const dispatch = useDispatch();

  if (!posterPath) return null;

  const handleClick = () => {
    dispatch(openModal({ content: movieData, contentType: "movie" }));
  };

  return (
    <div
      onClick={handleClick}
      className="w-32 md:w-44 lg:w-48 flex-shrink-0 cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 hover:z-10"
    >
      <img
        src={TMDB_IMG_CDN + posterPath}
        alt={title}
        className="rounded-md shadow-xl w-full h-auto"
      />
    </div>
  );
};

export default MovieCard;
