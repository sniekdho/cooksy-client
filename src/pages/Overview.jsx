import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";

const Overview = () => {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://cooksy-server-nine.vercel.app/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
    setLoading(false);
  }, []);

  if (loading) return <Spinner />;

  const myRecipes = recipes.filter((recipe) => recipe.email === user?.email);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-base-100 shadow-md p-4 rounded-xl text-center">
          <h2 className="text-lg font-medium">Total Recipes</h2>
          <p className="text-2xl font-bold text-secondary">{recipes.length}</p>
        </div>

        <div className="bg-base-100 shadow-md p-4 rounded-xl text-center">
          <h2 className="text-lg font-medium">My Recipes</h2>
          <p className="text-2xl font-bold text-secondary">
            {myRecipes.length}
          </p>
        </div>

        <div className="bg-base-100 shadow-md p-4 rounded-xl text-center">
          <h2 className="text-lg font-medium">Logged-in Email</h2>
          <p className="text-md font-semibold text-accent break-all">
            {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
