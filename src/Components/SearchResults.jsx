import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import MovieCard from "./MovieCard";
import TVCard from "./TVCard";
import { TMDB_API_OPTIONS } from "../Utils/tmdbConfig";
import { setSearchResults } from "../Utils/searchSlice";

const SearchResults = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchQuery = useSelector((store) => store.search.searchQuery);
  const searchResults = useSelector((store) => store.search.searchResults);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      navigate("/browse");
      return;
    }

    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
            searchQuery
          )}&include_adult=false&language=en-US&page=1`,
          TMDB_API_OPTIONS
        );
        const json = await response.json();
        dispatch(setSearchResults(json.results));
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, dispatch, navigate]);

  return (
    <div className="bg-black min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="pt-20 md:pt-24 pb-20">
        <div className="px-4 md:px-12 lg:px-16">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8">
            Search results for &quot;{searchQuery}&quot;
          </h1>
          {isLoading ? (
            <div className="text-center text-gray-400 mt-20">
              <p className="text-xl">Searching...</p>
            </div>
          ) : searchResults && searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {searchResults.map((item) => {
                if (item.media_type === "person") return null;
                return item.media_type === "tv" ? (
                  <TVCard
                    key={item.id}
                    posterPath={item.poster_path}
                    name={item.name}
                  />
                ) : (
                  <MovieCard
                    key={item.id}
                    posterPath={item.poster_path}
                    title={item.title}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-400 mt-20">
              <p className="text-xl md:text-2xl">No results found</p>
              <p className="mt-4 text-sm md:text-base">
                Try searching for something else
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
