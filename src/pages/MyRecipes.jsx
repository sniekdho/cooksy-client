import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import MyRecipesCard from "../components/MyRecipesCard";
import Swal from "sweetalert2";
import Spinner from "../components/Spinner";

const MyRecipes = () => {
  const { user } = useContext(AuthContext);
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://cooksy-server-nine.vercel.app/recipes?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        Swal.fire("Error", "Failed to load recipes", "error");
      });
  }, [user.email]);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">
        My Recipes
      </h1>
      <p className="text-center text-base-content mb-6">
        Here are all the delicious recipes you’ve added. You can update or
        delete them anytime!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myRecipes.map((recipe) => (
          <MyRecipesCard
            key={recipe._id}
            recipe={recipe}
            myRecipes={myRecipes}
            setMyRecipes={setMyRecipes}
          ></MyRecipesCard>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
