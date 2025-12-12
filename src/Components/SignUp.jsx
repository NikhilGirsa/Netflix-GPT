import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [isActive, setIsActive] = useState(false);
  const emailRef = useRef(null);
  const navigate = useNavigate();

  const handleGetStarted = (e) => {
    e.preventDefault(); // Prevent form refresh
    e.stopPropagation(); // Stop event from bubbling up

    const email = emailRef.current?.value?.trim();
    console.log("Email entered:", email); // Debug log

    if (email) {
      console.log("Navigating to register with email:", email); // Debug log
      navigate("/register", { state: { email } }); // 👈 pass email to Register page
    } else {
      console.log("No email entered"); // Debug log
    }
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      setIsActive(false);
    }
  };

  return (
    <div className="text-center text-white max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-6xl font-extrabold mb-4 leading-tight">
        Unlimited movies, TV shows and more
      </h1>
      <h3 className="text-lg md:text-xl mb-3">
        Starts at ₹149. Cancel at any time.
      </h3>
      <p className="mb-6 text-sm md:text-base">
        Ready to watch? Enter your email to create or restart your membership.
      </p>

      <form
        onSubmit={handleGetStarted}
        className="flex flex-col sm:flex-row justify-center items-center gap-3 relative"
      >
        <div className="relative w-1/2">
          <label
            className={`absolute left-3 transition-all duration-200 pointer-events-none ${
              isActive
                ? "-top-1 text-xs text-gray-400"
                : "top-1/2 -translate-y-1/2 text-gray-400"
            }`}
          >
            Email address
          </label>
          <input
            ref={emailRef}
            onBlur={handleBlur}
            onFocus={() => setIsActive(true)}
            className="p-3 pt-5 rounded w-full bg-zinc-800 text-white focus:outline-none"
            type="email"
          />
        </div>
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 transition-colors px-6 py-3 text-lg font-medium rounded-sm cursor-pointer"
        >
          Get Started &gt;
        </button>
      </form>
    </div>
  );
};

export default SignUp;
