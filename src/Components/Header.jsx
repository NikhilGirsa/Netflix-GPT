import React from "react";

const Header = ({ isSignIn, toggleSignIn }) => {
  return (
    <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black flex justify-between items-center p-4 md:p-8 z-10">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
        alt="Netflix Logo"
        className="h-10 md:h-12"
      />
      {!isSignIn && (
        <button
          onClick={toggleSignIn}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 font-semibold rounded"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Header;
