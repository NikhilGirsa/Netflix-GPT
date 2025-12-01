import { useDispatch } from "react-redux";
import { TMDB_IMG_CDN } from "../Utils/tmdbConfig";
import { openModal } from "../Utils/modalSlice";

const TVCard = ({ posterPath, name, showData }) => {
  const dispatch = useDispatch();

  if (!posterPath) return null;

  const handleClick = () => {
    dispatch(openModal({ content: showData, contentType: "tv" }));
  };

  return (
    <div
      onClick={handleClick}
      className="w-32 md:w-44 lg:w-48 flex-shrink-0 cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 hover:z-10"
    >
      <img
        src={TMDB_IMG_CDN + posterPath}
        alt={name}
        className="rounded-md shadow-xl w-full h-auto"
      />
    </div>
  );
};

export default TVCard;
