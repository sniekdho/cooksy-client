import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const TopRecipes = () => {
  const [topRecipes, setTopRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/recipes?limit=6")
      .then((res) => res.json())
      .then((data) => setTopRecipes(data));
  }, []);

  return (
    <section className="my-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center">
        <span className="text-primary">Top</span>{" "}
        <span className="text-secondary">Recipes</span>
      </h2>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Discover our most loved recipes, handpicked for their flavor,
        simplicity, and popularity. Whether you're a beginner or a seasoned
        cook, these top picks will inspire your next meal.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="card bg-base-100 shadow-sm h-full flex flex-col"
          >
            <figure>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full object-cover"
              />
            </figure>
            <div className="card-body flex-grow flex flex-col">
              <h3 className="text-lg font-semibold line-clamp-2">
                {recipe.title}
              </h3>
              <p className="text-gray-600">
                <strong>Cuisine:</strong> {recipe.cuisine}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Likes:</strong> {recipe.likeCount}
              </p>
              <div className="mt-auto">
                <Link to={`/recipe_details/${recipe._id}`}>
                  <button className="btn w-full mt-6 text-black bg-[#d2b48c] hover:bg-[#c49c6e] hover:text-white">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRecipes;
