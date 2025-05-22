import React from "react";
import RecipeCard from "../components/RecipeCard";
import { useLoaderData } from "react-router";

const AllRecipes = () => {
  const initialRecipes = useLoaderData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {initialRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe}></RecipeCard>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
