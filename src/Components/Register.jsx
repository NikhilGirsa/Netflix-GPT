import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import { auth } from "../Utils/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NETFLIX_BGIMAGE } from "../Utils/Constants";

const Register = () => {
  const location = useLocation();
  const prefilledEmail = location.state?.email || "";

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleRegister = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      console.log("Email and password required");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User registered:", user);
      })
      .catch((error) => {
        console.error("Error registering:", error.code, error.message);
      });
  };

  return (
    <div className="relative w-full min-h-screen text-white">
      {/* Background image */}
      <img
        src={NETFLIX_BGIMAGE}
        className="absolute w-full h-full object-cover -z-20"
        alt="background"
      />

      {/* Black overlay */}
      <div className="absolute w-full h-full bg-black/60 -z-10" />

      {/* Header */}
      <Header />

      <div className="flex justify-center items-center min-h-screen px-4 pt-20">
        <div className="bg-black/75 p-8 rounded-md shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Create your account
          </h2>
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              ref={emailRef}
              type="email"
              defaultValue={prefilledEmail}
              className="p-3 rounded bg-zinc-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Email address"
              required
            />
            <input
              ref={passwordRef}
              type="password"
              className="p-3 rounded bg-zinc-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 transition-colors px-6 py-3 text-lg font-medium rounded text-white cursor-pointer"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
