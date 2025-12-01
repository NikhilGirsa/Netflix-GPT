import React, { useState } from "react";
import Header from "./Header";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { NETFLIX_BGIMAGE } from "../Utils/Constants";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(false);

  const toggleSignIn = () => {
    setIsSignIn((prev) => !prev);
  };

  return (
    <div className="relative w-full h-screen text-white">
      {/* Background image */}
      <img
        src={NETFLIX_BGIMAGE}
        className="absolute w-full h-full object-cover -z-20"
        alt="background"
      />

      {/* Black overlay */}
      <div className="absolute w-full h-full bg-black/60 -z-10" />

      {/* Header */}
      <Header isSignIn={isSignIn} toggleSignIn={toggleSignIn} />

      {/* Centered form */}
      <div className="flex justify-center items-center h-full px-4">
        <div className="bg-gray/75 p-8 rounded-md w-full max-w-2/3">
          {isSignIn ? <SignIn toggleSignIn={toggleSignIn} /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};

export default Login;
