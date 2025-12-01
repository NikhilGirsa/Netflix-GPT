import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Utils/Firebase";
import { Pencil, User, HelpCircle, LogOut } from "lucide-react";
import { GoTriangleDown } from "react-icons/go";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current); // cancel hiding if re-entered
    setOpen(true);
  };

  const handleMouseLeave = () => {
    // delay before closing (2 seconds here)
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Error signing out:", error);
      });
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Profile + Caret */}
      <div className="flex items-center cursor-pointer space-x-1">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="Profile"
          className="w-8 h-8 rounded"
        />
        <GoTriangleDown
          className={`w-4 h-4 text-white transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-black/90 text-white rounded shadow-lg border border-gray-700 animate-fadeIn">
          {/* Profiles
          <div className="p-2">
            <div className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded cursor-pointer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                className="w-6 h-6 rounded"
                alt="Dc"
              />
              <span>Dc</span>
            </div>
            <div className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded cursor-pointer">
              <img
                src="https://occ-0-3933-3934.1.nflxso.net/dnm/api/v6/2mKnzZ3bWcJ7W0b6hs7zPQ91z5w/AAAABQKH0p.png?r=1d3"
                className="w-6 h-6 rounded"
                alt="P"
              />
              <span>P</span>
            </div>
            <div className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded cursor-pointer">
              <img
                src="https://occ-0-3933-3934.1.nflxso.net/dnm/api/v6/2mKnzZ3bWcJ7W0b6hs7zPQ91z5w/AAAABfQLucky.png?r=123"
                className="w-6 h-6 rounded"
                alt="Lucky"
              />
              <span>Lucky</span>
            </div>
            <div className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded cursor-pointer">
              <img
                src="https://occ-0-3933-3934.1.nflxso.net/dnm/api/v6/2mKnzZ3bWcJ7W0b6hs7zPQ91z5w/AAAABKids.png?r=456"
                className="w-6 h-6 rounded"
                alt="Kids"
              />
              <span>LankyBox</span>
            </div>
          </div> */}

          <hr className="border-gray-700" />

          {/* Options */}
          <div className="p-2 text-sm">
            <div className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded cursor-pointer">
              <Pencil className="w-4 h-4" />
              <span>Manage Profiles</span>
            </div>
            <div className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded cursor-pointer">
              <User className="w-4 h-4" />
              <span>Transfer Profile</span>
            </div>
            <div className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded cursor-pointer">
              <User className="w-4 h-4" />
              <span>Account</span>
            </div>
            <div className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded cursor-pointer">
              <HelpCircle className="w-4 h-4" />
              <span>Help Centre</span>
            </div>
          </div>

          <hr className="border-gray-700" />

          {/* Sign Out */}
          <div className="p-2" onClick={handleSignOut}>
            <div className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded cursor-pointer">
              <LogOut className="w-4 h-4" />
              <span>Sign out of Netflix</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
