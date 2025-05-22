import React from "react";
import { useLoaderData } from "react-router";

const RecipeDetails = () => {
  const singleRecipe = useLoaderData();
  const {
    image,
    title,
    name,
    cuisine,
    prepTime,
    ingredients,
    instructions,
    categories,
    likeCount,
  } = singleRecipe || {};

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 mt-10 mb-20 bg-white shadow-md rounded-xl">
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        By <strong>{name}</strong>
      </p>

      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Cuisine:</strong> {cuisine}
        </p>
        <p>
          <strong>Preparation Time:</strong> {prepTime} minutes
        </p>
        <p>
          <strong>Ingredients:</strong> {ingredients}
        </p>
        <p>
          <strong>Instructions:</strong> {instructions}
        </p>
        <p>
          <strong>Categories:</strong> {categories?.join(", ")}
        </p>
        <p>
          <strong>Likes:</strong> {likeCount}
        </p>
      </div>

      <button className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md cursor-pointer">
        ❤️ Like
      </button>
    </div>
  );
};

export default RecipeDetails;
