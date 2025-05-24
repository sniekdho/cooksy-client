import React from "react";
import cookingAnimation from "../assets/animation/cooking.json";
import { Link } from "react-router";
import Lottie from "lottie-react";

const Page404 = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center text-center p-6">
      <div className="my-8 flex justify-center">
        <Lottie
          animationData={cookingAnimation}
          loop={true}
          style={{ maxWidth: "300px", width: "100%" }}
        />
      </div>
      <h1 className="text-5xl font-extrabold text-pink-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-base-content mb-2">
        Oops! Your snack got lost...
      </h2>
      <p className="text-base-content/70 mb-6">
        The page you’re looking for doesn’t exist or has been devoured.
      </p>
      <Link
        to="/"
        className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg shadow transition font-semibold"
      >
        🍔 Go back to Homepage
      </Link>
    </div>
  );
};

export default Page404;
