import TVCard from "./TVCard";

const TVList = ({ title, shows }) => {
  if (!shows) return null;

  return (
    <div className="px-4 md:px-12 lg:px-16">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-3 md:mb-4">
        {title}
      </h2>
      <div className="flex overflow-x-scroll scrollbar-hide pb-2">
        <div className="flex gap-2 md:gap-3">
          {shows.map((show) => (
            <TVCard
              key={show.id}
              posterPath={show.poster_path}
              name={show.name}
              showData={show}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVList;
