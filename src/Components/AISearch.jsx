import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Sparkles, Loader2 } from "lucide-react";
import Header from "./Header";
import MovieCard from "./MovieCard";
import TVCard from "./TVCard";
import PreviewModal from "./PreviewModal";
import {
  setAiQuery,
  setAiRecommendations,
  setAiSearchResults,
  setAiLoading,
  setAiError,
} from "../Utils/aiSearchSlice";
import {
  OPENAI_API_URL,
  OPENAI_REQUEST_OPTIONS,
  SYSTEM_PROMPT,
} from "../Utils/openaiConfig";
import { TMDB_API_OPTIONS } from "../Utils/tmdbConfig";
import { getTranslation } from "../Utils/languageConstants";

const AISearch = () => {
  const [inputQuery, setInputQuery] = useState("");
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (store) => store.language.selectedLanguage
  );
  const aiSearchState = useSelector((store) => store.aiSearch);
  const {
    aiQuery,
    aiRecommendations,
    aiExplanation,
    aiSearchResults,
    isLoading,
    error,
  } = aiSearchState;

  const t = (key) => getTranslation(currentLanguage, key);

  const searchMovieInTMDB = async (movieTitle) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
          movieTitle
        )}&include_adult=false&language=en-US&page=1`,
        TMDB_API_OPTIONS
      );
      const json = await response.json();
      return json.results?.[0] || null;
    } catch (error) {
      console.error(`Error searching for ${movieTitle}:`, error);
      return null;
    }
  };

  const handleAiSearch = async (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    dispatch(setAiLoading(true));
    dispatch(setAiError(null));
    dispatch(setAiQuery(inputQuery));

    try {
      // Call OpenAI API
      const openaiResponse = await fetch(OPENAI_API_URL, {
        ...OPENAI_REQUEST_OPTIONS,
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: inputQuery },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!openaiResponse.ok) {
        const errorData = await openaiResponse.json().catch(() => ({}));
        let errorMessage = "Failed to get AI recommendations";

        if (openaiResponse.status === 429) {
          errorMessage =
            "Rate limit exceeded. Please wait a moment and try again, or check your OpenAI account credits.";
        } else if (openaiResponse.status === 401) {
          errorMessage =
            "Invalid API key. Please check your OpenAI API key in openaiConfig.jsx";
        } else if (openaiResponse.status === 403) {
          errorMessage =
            "Access forbidden. Your API key may not have the required permissions.";
        } else if (errorData.error?.message) {
          errorMessage = errorData.error.message;
        }

        throw new Error(errorMessage);
      }

      const openaiData = await openaiResponse.json();
      const aiResponse = JSON.parse(openaiData.choices[0].message.content);

      dispatch(
        setAiRecommendations({
          recommendations: aiResponse.recommendations,
          explanation: aiResponse.explanation,
        })
      );

      // Search each recommendation in TMDB
      const tmdbPromises = aiResponse.recommendations.map((title) =>
        searchMovieInTMDB(title)
      );
      const tmdbResults = await Promise.all(tmdbPromises);
      const validResults = tmdbResults.filter((result) => result !== null);

      dispatch(setAiSearchResults(validResults));
    } catch (err) {
      console.error("AI Search Error:", err);
      dispatch(
        setAiError(err.message || "Something went wrong. Please try again.")
      );
    } finally {
      dispatch(setAiLoading(false));
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="pt-20 md:pt-24 pb-20">
        <div className="px-4 md:px-12 lg:px-16">
          {/* AI Search Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-purple-500 mr-3" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                AI-Powered Search
              </h1>
            </div>
            <p className="text-center text-gray-400 mb-8 text-sm md:text-base">
              Ask AI anything about movies and TV shows. Try "best sci-fi
              movies", "romantic comedies from the 90s", or "award-winning
              Indian films"
            </p>

            {/* Search Form */}
            <form onSubmit={handleAiSearch} className="relative">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask AI for movie recommendations..."
                className="w-full bg-gray-900/50 backdrop-blur-sm text-white px-6 py-4 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputQuery.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-semibold transition flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Thinking...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Ask AI</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-4xl mx-auto mb-8 bg-red-900/20 border border-red-500/50 rounded-lg p-6">
              <h3 className="text-red-400 font-semibold mb-2 text-center">
                ⚠️ Error
              </h3>
              <p className="text-red-300 text-center mb-3">{error}</p>
              <div className="bg-gray-900/50 rounded-lg p-4 text-sm">
                <p className="text-gray-300 mb-2">Common solutions:</p>
                <ul className="text-gray-400 space-y-1 list-disc list-inside">
                  <li>
                    Verify your API key is correct in{" "}
                    <code className="bg-gray-800 px-1 rounded">
                      openaiConfig.jsx
                    </code>
                  </li>
                  <li>
                    Check your OpenAI account has available credits at{" "}
                    <a
                      href="https://platform.openai.com/account/usage"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:underline"
                    >
                      platform.openai.com
                    </a>
                  </li>
                  <li>Ensure your API key has chat completion permissions</li>
                  <li>Wait a few seconds if you hit rate limits</li>
                </ul>
              </div>
            </div>
          )}

          {/* AI Explanation */}
          {aiExplanation && (
            <div className="max-w-4xl mx-auto mb-8 bg-purple-900/20 border border-purple-500/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-purple-400 mb-3 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                AI Recommendation
              </h2>
              <p className="text-gray-300 leading-relaxed">{aiExplanation}</p>
              {aiRecommendations && (
                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-2">
                    Recommended titles:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {aiRecommendations.map((title, index) => (
                      <li key={index} className="text-purple-300 text-sm">
                        {title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Search Results */}
          {aiQuery && !isLoading && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Results for &quot;{aiQuery}&quot;
              </h2>
              {aiSearchResults.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {aiSearchResults.map((item) => {
                    if (item.media_type === "person") return null;
                    return item.media_type === "tv" ? (
                      <TVCard
                        key={item.id}
                        showData={item}
                        posterPath={item.poster_path}
                        name={item.name}
                      />
                    ) : (
                      <MovieCard
                        key={item.id}
                        movieData={item}
                        posterPath={item.poster_path}
                        title={item.title}
                      />
                    );
                  })}
                </div>
              ) : (
                !error && (
                  <div className="text-center text-gray-400 mt-20">
                    <p className="text-xl md:text-2xl">
                      No matching content found in our database
                    </p>
                    <p className="mt-4 text-sm md:text-base">
                      Try asking for different or more popular titles
                    </p>
                  </div>
                )
              )}
            </>
          )}

          {/* Initial State */}
          {!aiQuery && !isLoading && (
            <div className="text-center text-gray-500 mt-20">
              <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl md:text-2xl">
                Ask AI to discover amazing content
              </p>
              <p className="mt-4 text-sm md:text-base">
                Our AI assistant will help you find the perfect movies and shows
              </p>
            </div>
          )}
        </div>
      </div>
      <PreviewModal />
    </div>
  );
};

export default AISearch;
