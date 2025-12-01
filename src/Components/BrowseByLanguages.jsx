import { useState } from "react";
import Header from "./Header";
import MovieList from "./MovieList";
import TVList from "./TVList";
import { TMDB_API_OPTIONS } from "../Utils/tmdbConfig";

const BrowseByLanguages = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [movies, setMovies] = useState(null);
  const [tvShows, setTVShows] = useState(null);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh", name: "Chinese" },
    { code: "hi", name: "Hindi" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "ar", name: "Arabic" },
  ];

  const fetchContentByLanguage = async (langCode) => {
    try {
      // Fetch movies
      const moviesResponse = await fetch(
        `https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&with_original_language=${langCode}&sort_by=popularity.desc`,
        TMDB_API_OPTIONS
      );
      const moviesJson = await moviesResponse.json();
      setMovies(moviesJson.results);

      // Fetch TV shows
      const tvResponse = await fetch(
        `https://api.themoviedb.org/3/discover/tv?language=en-US&page=1&with_original_language=${langCode}&sort_by=popularity.desc`,
        TMDB_API_OPTIONS
      );
      const tvJson = await tvResponse.json();
      setTVShows(tvJson.results);
    } catch (error) {
      console.error("Error fetching content by language:", error);
    }
  };

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    fetchContentByLanguage(langCode);
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="pt-20 md:pt-24 pb-20">
        <div className="px-4 md:px-12 lg:px-16 mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
            Browse by Languages
          </h1>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-semibold transition ${
                  selectedLanguage === lang.code
                    ? "bg-white text-black"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
        {movies || tvShows ? (
          <div className="space-y-8 md:space-y-12">
            {movies && <MovieList title="Movies" movies={movies} />}
            {tvShows && <TVList title="TV Shows" shows={tvShows} />}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-xl md:text-2xl">
              Select a language to browse content
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseByLanguages;
