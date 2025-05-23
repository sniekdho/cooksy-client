import React from "react";
import not_found from "../assets/images/error.jpg";
import { Link } from "react-router";

const Page404 = () => {
  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center text-center p-6">
      <img
        src={not_found}
        alt="404 - Not Found"
        className="w-64 md:w-96 mb-8 animate-pulse rounded-lg shadow-pink-600 shadow-2xl"
      />
      <h1 className="text-5xl font-extrabold text-orange-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Oops! Your snack got lost...
      </h2>
      <p className="text-gray-600 mb-6">
        The page you’re looking for doesn’t exist or has been devoured.
      </p>
      <Link
        to="/"
        className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-600 transition"
      >
        🍔 Go back to Homepage
      </Link>
    </div>
  );
};

export default Page404;
