import { useSelector } from "react-redux";
import Header from "./Header";
import MovieCard from "./MovieCard";
import TVCard from "./TVCard";

const MyList = () => {
  const myListItems = useSelector((store) => store.myList.items);

  return (
    <div className="bg-black min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="pt-20 md:pt-24 pb-20">
        <div className="px-4 md:px-12 lg:px-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
            My List
          </h1>
          {myListItems.length === 0 ? (
            <div className="text-center text-gray-400 mt-20">
              <p className="text-xl md:text-2xl">Your list is empty</p>
              <p className="mt-4 text-sm md:text-base">
                Add movies and TV shows to your list to watch them later
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {myListItems.map((item) =>
                item.media_type === "tv" ? (
                  <TVCard
                    key={item.id}
                    posterPath={item.poster_path}
                    name={item.name || item.title}
                  />
                ) : (
                  <MovieCard
                    key={item.id}
                    posterPath={item.poster_path}
                    title={item.title || item.name}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyList;
