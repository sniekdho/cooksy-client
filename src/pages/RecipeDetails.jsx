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
    <div>
      <h2 className="text-4xl font-extrabold text-pink-600 mb-2 mt-10 text-center">
        Recipe Details
      </h2>
      <p className="text-base-content/70 text-lg max-w-xl mx-auto text-center">
        Discover all the ingredients, instructions, and tips to make this
        delicious recipe come alive in your kitchen.
      </p>
      <div className="max-w-4xl mx-auto px-6 py-10 mt-10 mb-20 bg-base-100 shadow-lg rounded-xl text-base-content">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
        />

        <h3 className="text-lg font-semibold text-pink-500 mb-4">
          {likeCount} people interested in this recipe
        </h3>

        <h1 className="text-3xl font-bold mb-2 text-pink-600">{title}</h1>
        <p className="text-sm text-base-content/60 mb-6">
          By <strong className="text-pink-500">{name}</strong>
        </p>

        <div className="space-y-2 text-base-content/80 leading-relaxed">
          <p>
            <strong className="text-pink-500">Cuisine:</strong> {cuisine}
          </p>
          <p>
            <strong className="text-pink-500">Preparation Time:</strong>{" "}
            {prepTime} minutes
          </p>
          <p>
            <strong className="text-pink-500">Ingredients:</strong>{" "}
            {ingredients}
          </p>
          <p>
            <strong className="text-pink-500">Instructions:</strong>{" "}
            {instructions}
          </p>
          <p>
            <strong className="text-pink-500">Categories:</strong>{" "}
            {categories?.join(", ")}
          </p>
          <p>
            <strong className="text-pink-500">Likes:</strong> {likeCount}
          </p>
        </div>

        <button
          onClick={handleLike}
          className="mt-8 w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-md shadow-md transition-colors cursor-pointer"
        >
          ❤️ Like
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;
