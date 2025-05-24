import React from "react";
import { Link } from "react-router";

const RecipeCard = ({ recipe }) => {
  const { _id, image, title, cuisine, prepTime, email, likeCount } =
    recipe || {};
  return (
    <div className="card bg-base-100 rounded-xl shadow-md overflow-hidden transition hover:shadow-lg">
      <figure>
        <img src={image} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-primary">{title}</h2>
        <p className="text-sm text-base-content/70">
          <strong className="text-secondary">Cuisine:</strong> {cuisine}
        </p>
        <p className="text-sm text-base-content/70">
          <strong className="text-secondary">Prep Time:</strong> {prepTime} mins
        </p>
        <p className="text-sm text-base-content/70">
          <strong className="text-secondary">Added By:</strong> {email}
        </p>
        <p className="text-sm text-base-content/70">
          <strong className="text-secondary">Likes:</strong> {likeCount}
        </p>
        <Link to={`/recipe_details/${_id}`}>
          <button className="mt-4 bg-primary hover:bg-primary-focus text-primary-content px-4 py-2 rounded-md w-full cursor-pointer">
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
