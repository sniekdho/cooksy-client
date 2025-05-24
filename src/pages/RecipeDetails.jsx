import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const RecipeDetails = () => {
  const singleRecipe = useLoaderData();
  const [recipe, setRecipe] = useState(singleRecipe);
  const { user } = useContext(AuthContext);

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
  } = recipe || {};

  const handleLike = () => {
    if (user.email === recipe.email) {
      Swal.fire({
        icon: "warning",
        title: "You can't like your own recipe!",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const newLikes = likeCount + 1;

    fetch(`https://cooksy-server-nine.vercel.app/recipes/${singleRecipe._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ likeCount: newLikes }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.matchedCount) {
          setRecipe({ ...recipe, likeCount: newLikes });
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 mt-10 mb-20 bg-white shadow-md rounded-xl">
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <h3 className="text-lg font-semibold text-pink-600 mb-4">
        {likeCount} people interested in this recipe
      </h3>

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

      <button
        onClick={handleLike}
        className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md cursor-pointer"
      >
        ❤️ Like
      </button>
    </div>
  );
};

export default RecipeDetails;
