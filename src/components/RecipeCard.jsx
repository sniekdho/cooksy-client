import React from "react";
import { Link } from "react-router";

const RecipeCard = ({ recipe }) => {
  const { _id, image, title, cuisine, prepTime, email, likeCount } =
    recipe || {};
  return (
    <div className="card bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm text-gray-600">
          <strong>Cuisine:</strong> {cuisine}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Prep Time:</strong> {prepTime} mins
        </p>
        <p className="text-sm text-gray-600">
          <strong>Added By:</strong> {email}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Likes:</strong> {likeCount}
        </p>
        <Link to={`/recipe_details/${_id}`}>
          <button className="mt-4 bg-[#d2b48c] hover:bg-[#c49c6e] text-black hover:text-white px-4 py-2 rounded-md w-full cursor-pointer">
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
