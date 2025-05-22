import React, { useEffect, useState } from "react";
import RecipeCard from "../components/AllRecipesCard";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      });
  }, [setLoading]);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#d2b48c]">
        All Recipes
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Discover a wide variety of delicious recipes shared by our cooking
        community.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe}></RecipeCard>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
