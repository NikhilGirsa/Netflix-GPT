import { useState, useRef, useEffect } from "react";
import Header from "./Header";
import { Send, Sparkles, Film } from "lucide-react";
import { TMDB_API_OPTIONS } from "../Utils/tmdbConfig";

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm your Netflix AI Assistant. I can help you discover movies and TV shows. Try asking me things like:\n\n• Recommend me a good action movie\n• What are some funny comedies?\n• Suggest a thriller to watch tonight\n• Find me something like Inception",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = async (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Detect intent and genre
    let genre = null;
    let query = "";

    if (lowerMessage.includes("action") || lowerMessage.includes("adventure")) {
      genre = 28; // Action
      query = "action";
    } else if (
      lowerMessage.includes("comedy") ||
      lowerMessage.includes("funny")
    ) {
      genre = 35; // Comedy
      query = "comedy";
    } else if (
      lowerMessage.includes("horror") ||
      lowerMessage.includes("scary")
    ) {
      genre = 27; // Horror
      query = "horror";
    } else if (
      lowerMessage.includes("romance") ||
      lowerMessage.includes("romantic") ||
      lowerMessage.includes("love")
    ) {
      genre = 10749; // Romance
      query = "romance";
    } else if (
      lowerMessage.includes("thriller") ||
      lowerMessage.includes("suspense")
    ) {
      genre = 53; // Thriller
      query = "thriller";
    } else if (
      lowerMessage.includes("sci-fi") ||
      lowerMessage.includes("science fiction")
    ) {
      genre = 878; // Sci-Fi
      query = "sci-fi";
    } else if (
      lowerMessage.includes("drama") ||
      lowerMessage.includes("emotional")
    ) {
      genre = 18; // Drama
      query = "drama";
    } else if (
      lowerMessage.includes("animation") ||
      lowerMessage.includes("animated") ||
      lowerMessage.includes("cartoon")
    ) {
      genre = 16; // Animation
      query = "animation";
    }

    try {
      let response;
      let movies = [];

      if (genre) {
        // Fetch by genre
        response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&sort_by=vote_average.desc&vote_count.gte=100&language=en-US&page=1`,
          TMDB_API_OPTIONS
        );
        const data = await response.json();
        movies = data.results?.slice(0, 5) || [];
      } else {
        // Default to popular movies
        response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          TMDB_API_OPTIONS
        );
        const data = await response.json();
        movies = data.results?.slice(0, 5) || [];
        query = "popular";
      }

      // Generate response
      let aiResponse = "";

      if (movies.length > 0) {
        if (genre) {
          aiResponse = `Great choice! Here are some amazing ${query} movies I think you'll love:\n\n`;
        } else {
          aiResponse = `Here are some popular movies you might enjoy:\n\n`;
        }

        movies.forEach((movie, index) => {
          aiResponse += `${index + 1}. **${movie.title}**${
            movie.vote_average
              ? ` (⭐ ${movie.vote_average.toFixed(1)}/10)`
              : ""
          }\n${movie.overview ? movie.overview.slice(0, 120) + "..." : ""}\n\n`;
        });

        aiResponse +=
          "\n💡 Click on any movie in the Browse section to watch the trailer and get more details!";
      } else {
        aiResponse =
          "I couldn't find specific recommendations right now, but you can browse our extensive collection in the Movies and TV Shows sections!";
      }

      return aiResponse;
    } catch (error) {
      console.error("Error fetching AI recommendations:", error);
      return "Sorry, I'm having trouble fetching recommendations right now. Please try browsing our Movies or TV Shows sections!";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    // Set loading
    setIsLoading(true);

    // Simulate thinking delay
    setTimeout(async () => {
      const aiResponse = await getAIResponse(userMessage);

      // Add AI response
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiResponse },
      ]);

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <Header />
      <div className="pt-20 md:pt-24 pb-6 px-4 md:px-12 lg:px-16 min-h-screen flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              AI Movie Assistant
            </h1>
          </div>
          <p className="text-gray-400">
            Ask me anything about movies and TV shows!
          </p>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 bg-zinc-900 rounded-lg p-4 md:p-6 mb-4 overflow-y-auto max-h-[calc(100vh-300px)]">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] md:max-w-[70%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-red-600 text-white"
                      : "bg-zinc-800 text-white"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2">
                      <Film className="w-4 h-4 text-red-500" />
                      <span className="text-xs font-semibold text-red-500">
                        AI Assistant
                      </span>
                    </div>
                  )}
                  <div className="whitespace-pre-line text-sm md:text-base">
                    {message.content.split("**").map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i} className="font-bold">
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 text-white rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-sm text-gray-400">
                      AI is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me for movie suggestions..."
            disabled={isLoading}
            className="w-full bg-zinc-900 text-white rounded-full py-3 md:py-4 px-6 pr-14 focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-full p-2 md:p-2.5 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        {/* Quick Suggestions */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {[
            "Recommend action movies",
            "Best comedy films",
            "Scary horror movies",
            "Romantic movies",
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInput(suggestion)}
              className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs md:text-sm px-3 py-1.5 rounded-full transition"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIChat;
