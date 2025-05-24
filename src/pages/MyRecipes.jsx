import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import MyRecipesCard from "../components/MyRecipesCard";

const MyRecipes = () => {
  const { user } = useContext(AuthContext);
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    fetch(`https://cooksy-server-nine.vercel.app/recipes?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyRecipes(data);
      });
  }, [user.email]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#d2b48c]">
        My Recipes
      </h1>
      <p className="text-center text-gray-600 mb-6">
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
