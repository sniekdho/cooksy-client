import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-10 px-4">
      <div className="max-w-md w-full bg-gray-50 p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-center text-secondary mb-2">
          Create Your CookSy Account
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Join a community of food lovers. Save recipes, get personalized
          suggestions, and cook like a pro.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">User Name</label>
            <input
              type="text"
              name="name"
              placeholder="User Name"
              className="input input-bordered w-full"
              required
            />
          </div>

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
            <label className="block text-sm font-medium mb-1">Photo URL</label>
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />
          </div>

          <button type="submit" className="btn btn-accent w-full">
            SignUp
          </button>
        </form>

        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/auth/signin" className="text-accent font-semibold">
            SignIn
          </Link>
        </div>

        <div className="divider">OR</div>
        <button className="btn btn-outline w-full flex items-center justify-center">
          <FcGoogle className="mr-2" /> Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
