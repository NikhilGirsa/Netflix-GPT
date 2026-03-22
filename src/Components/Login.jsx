import React, { useState } from "react";
import Header from "./Header";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Background3D from "./Background3D";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(false);

  const toggleSignIn = () => {
    setIsSignIn((prev) => !prev);
  };

  return (
    <div className="relative w-full h-screen text-white overflow-hidden">
      <Background3D />

      {/* Header */}
      <Header isSignIn={isSignIn} toggleSignIn={toggleSignIn} />

      {/* Centered form */}
      <div className="flex justify-center items-center h-full px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-panel p-8 rounded-2xl w-full max-w-md shadow-2xl border border-white/20"
        >
          {isSignIn ? <SignIn toggleSignIn={toggleSignIn} /> : <SignUp />}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
