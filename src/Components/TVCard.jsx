import { TMDB_IMG_CDN } from "../Utils/tmdbConfig";

const TVCard = ({ posterPath, name }) => {
  if (!posterPath) return null;

  return (
    <div className="w-32 md:w-44 lg:w-48 flex-shrink-0 cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 hover:z-10">
      <img
        src={TMDB_IMG_CDN + posterPath}
        alt={name}
        className="rounded-md shadow-xl w-full h-auto"
      />
    </div>
  );
};

export default TVCard;
