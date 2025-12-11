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
        // Only navigate to browse if we're on the login page
        if (window.location.pathname === "/") {
          navigate("/browse");
        }
      } else {
        dispatch(removeUserInfo());
        navigate("/");
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
    <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/80 via-black/40 to-transparent flex justify-between items-center p-4 md:p-8 z-50">
      <img
        src={NETFLIX_IMG}
        alt="Netflix Logo"
        onClick={() => navigate("/")}
        className="h-10 md:h-12"
      />
      {!user && !isSignIn && (
        <button
          onClick={toggleSignIn}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 font-semibold rounded"
        >
          Sign In
        </button>
      )}

      {user && (
        <>
          <div>
            {/* Nav Links */}
            <nav className="hidden md:flex space-x-6 text-sm text-white font-medium">
              <button
                onClick={() => navigate("/browse")}
                className="hover:text-gray-300"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/tv-shows")}
                className="hover:text-gray-300"
              >
                TV Shows
              </button>
              <button
                onClick={() => navigate("/movies")}
                className="hover:text-gray-300"
              >
                Movies
              </button>
              <button
                onClick={() => navigate("/new-and-popular")}
                className="hover:text-gray-300"
              >
                New & Popular
              </button>
              <button
                onClick={() => navigate("/my-list")}
                className="hover:text-gray-300"
              >
                My List
              </button>
              <button
                onClick={() => navigate("/browse-by-languages")}
                className="hover:text-gray-300"
              >
                Browse by Languages
              </button>
            </nav>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-4 text-white">
            {/* Search */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-gray-700/50 transition"
              >
                <Search className="w-5 h-5" />
              </button>
              {searchOpen && (
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Titles, people, genres"
                    autoFocus
                    className="bg-black/70 text-white px-3 py-1 rounded focus:outline-none border border-gray-500"
                  />
                </form>
              )}
            </div>

            {/* Children */}
            <span className="text-sm cursor-pointer hover:text-gray-300">
              Children
            </span>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-700/50 rounded-full transition">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-xs rounded-full px-1">
                13
              </span>
            </button>

            {/* Profile Menu with Dropdown */}
            <ProfileMenu />
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
