import { useNavigate } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import ProfileMenu from "./ProfileMenu";
import { NETFLIX_IMG } from "../Utils/Constants";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utils/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { removeUserInfo, setUserInfo } from "../Utils/userSlice";
import { setSearchQuery } from "../Utils/searchSlice";

const Header = ({ isSignIn, toggleSignIn }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(setUserInfo({ uid, email, displayName }));
        // Navigate to browse if we're on the login or register page
        if (
          window.location.pathname === "/" ||
          window.location.pathname === "/register"
        ) {
          navigate("/browse");
        }
      } else {
        dispatch(removeUserInfo());
        // Don't navigate away if user is on the register page
        if (window.location.pathname !== "/register") {
          navigate("/");
        }
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(setSearchQuery(query));
      navigate("/search");
      setSearchOpen(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-gradient-to-b from-black via-black/80 to-transparent flex justify-between items-center px-4 md:px-12 lg:px-16 py-4 md:py-6 z-50 transition-all duration-300">
      <div className="flex items-center gap-6 md:gap-10">
        <img
          src={NETFLIX_IMG}
          alt="Netflix Logo"
          onClick={() => navigate("/")}
          className="h-6 md:h-8 cursor-pointer"
        />
        {user && (
          <nav className="hidden md:flex items-center gap-5 text-sm text-white">
            <button
              onClick={() => navigate("/browse")}
              className="hover:text-gray-300 transition font-medium"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/tv-shows")}
              className="hover:text-gray-300 transition"
            >
              TV Shows
            </button>
            <button
              onClick={() => navigate("/movies")}
              className="hover:text-gray-300 transition"
            >
              Movies
            </button>
            <button
              onClick={() => navigate("/new-and-popular")}
              className="hover:text-gray-300 transition"
            >
              New & Popular
            </button>
            <button
              onClick={() => navigate("/my-list")}
              className="hover:text-gray-300 transition"
            >
              My List
            </button>
            <button
              onClick={() => navigate("/browse-by-languages")}
              className="hover:text-gray-300 transition"
            >
              Browse by Languages
            </button>
            <button
              onClick={() => navigate("/ai-chat")}
              className="hover:text-gray-300 transition flex items-center gap-1"
            >
              AI Chat
            </button>
          </nav>
        )}
      </div>

      {!user && !isSignIn && (
        <button
          onClick={toggleSignIn}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 font-semibold rounded transition"
        >
          Sign In
        </button>
      )}

      {user && (
        <div className="flex items-center gap-4 md:gap-6 text-white">
          {/* Search */}
          <div className="flex items-center">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-white/10 rounded-full transition"
            >
              <Search className="w-5 h-5" />
            </button>
            {searchOpen && (
              <form onSubmit={handleSearch} className="ml-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Titles, people, genres"
                  autoFocus
                  className="bg-black/80 border border-white/50 text-white px-4 py-1.5 rounded focus:outline-none focus:border-white w-48 md:w-64"
                />
              </form>
            )}
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-white/10 rounded-full transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>

          {/* Profile */}
          <ProfileMenu />
        </div>
      )}
    </div>
  );
};

export default Header;
