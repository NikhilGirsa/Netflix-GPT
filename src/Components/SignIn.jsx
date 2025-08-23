import { useRef, useState } from "react";
import { checkValidData } from "../Utils/Validate";
import { auth } from "../Utils/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = ({ toggleSignIn }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errors, setErrors] = useState({ email: "", password: "", global: "" });

  const handleSignIn = () => {
    const validationErrors = checkValidData(
      emailRef.current.value,
      passwordRef.current.value
    );
    setErrors(validationErrors);

    if (
      !validationErrors.email &&
      !validationErrors.password &&
      !validationErrors.global
    ) {
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User signed in:", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(`Error signing in: ${errorCode}`);
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-full px-4">
      <div className="bg-black/60 p-10 rounded-md w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6">Sign In</h2>

        {/* Global Yellow Box */}
        {errors.global && (
          <div className="bg-yellow-300 text-black text-sm p-3 my-2 rounded">
            {errors.global}
          </div>
        )}

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Email Field */}
          <div>
            <input
              ref={emailRef}
              type="email"
              placeholder="Email or mobile number"
              className="p-3 rounded bg-zinc-800 text-white placeholder-gray-400 focus:outline-none w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="p-3 rounded bg-zinc-800 text-white placeholder-gray-400 focus:outline-none w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            className="bg-red-600 hover:bg-red-700 py-3 font-semibold rounded"
            onClick={handleSignIn}
          >
            Sign In
          </button>

          <div className="text-center text-sm text-gray-400">OR</div>

          <button className="bg-gray-600 hover:bg-gray-700 py-3 font-medium rounded">
            Use a sign-in code
          </button>

          <div className="text-right text-sm text-blue-400 hover:underline cursor-pointer">
            Forgot password?
          </div>

          <div className="flex items-center text-sm text-gray-400">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember">Remember me</label>
          </div>

          <div className="text-sm mt-4 text-gray-400">
            New to Netflix?{" "}
            <span
              className="text-white hover:underline cursor-pointer"
              onClick={toggleSignIn}
            >
              Sign up now.
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.{" "}
            <span className="text-blue-500 hover:underline cursor-pointer">
              Learn more.
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
