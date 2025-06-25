import React, { useEffect, useState } from "react";
import RecipeCard from "../components/AllRecipesCard";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");

  const cuisineTypes = [
    "All",
    "Italian",
    "Mexican",
    "Indian",
    "Chinese",
    "Others",
  ];

  // const cuisineTypes = ["All", ...new Set(recipes.map(recipe => recipe.cuisine).filter(Boolean))];

  useEffect(() => {
    setLoading(true);
    fetch("https://cooksy-server-nine.vercel.app/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      });
  }, [setLoading]);

  const filteredRecipes =
    selectedCuisine === "All"
      ? recipes
      : recipes.filter(
          (recipe) =>
            recipe.cuisine?.toLowerCase() === selectedCuisine.toLowerCase()
        );

  if (sortOrder === "asc") {
    filteredRecipes.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOrder === "desc") {
    filteredRecipes.sort((a, b) => b.title.localeCompare(a.title));
  }

  if (loading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        All Recipes
      </h2>
      <p className="text-center text-base-content/70 mb-6">
        Discover a wide variety of delicious recipes shared by our cooking
        community.
      </p>

      <div className="flex justify-center mt-6 mb-6 gap-4 flex-wrap">
        {/* filtering functionality */}
        <select
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
          className="px-4 py-2 border rounded-md shadow-md text-base-content bg-base-200 border-base-content/30"
        >
          {cuisineTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* sorting functionality */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border rounded-md shadow-md bg-base-200 border-base-content/30"
        >
          <option value="none">Sort by</option>
          <option value="asc">Title (A-Z)</option>
          <option value="desc">Title (Z-A)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe}></RecipeCard>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
