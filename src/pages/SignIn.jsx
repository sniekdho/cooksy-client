import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const SignIn = () => {
  const [showEye, setShowEye] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-10 px-4">
      <div className="max-w-md w-full bg-gray-50 p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-center text-secondary mb-2">
          Welcome Back to CookSy
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Log in to explore your saved recipes, track cooking goals, and enjoy
          your culinary journey.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showEye ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered w-full"
                required
              />
              <div
                className="absolute top-2 right-5 z-50 cursor-pointer"
                onClick={() => setShowEye(!showEye)}
              >
                {showEye ? <Eye /> : <EyeOff />}
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-accent w-full">
            SignIn
          </button>
        </form>

        <div className="text-right mt-2 text-sm text-gray-600">
          <Link to="/forgot-password" className="hover:text-accent">
            Forgot password?
          </Link>
        </div>

        <div className="text-center mt-4">
          New user?{" "}
          <Link to="/auth/signup" className="text-accent font-semibold">
            SignUp
          </Link>
        </div>

        <div className="divider">OR</div>
        <button className="btn btn-outline w-full flex items-center justify-center">
          <FcGoogle className="mr-2" /> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
