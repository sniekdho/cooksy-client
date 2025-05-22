import React from "react";
import Swal from "sweetalert2";

const MyRecipesCard = ({ recipe, myRecipes, setMyRecipes }) => {
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/recipes/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Recipe deleted.",
                icon: "success",
              });
              setMyRecipes(myRecipes.filter((myRecipe) => myRecipe._id !== id));
            }
          });
      }
    });
  };

  return (
    <div key={recipe._id} className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{recipe.title}</h2>
        <p>
          <strong>Ingredients:</strong> {recipe.ingredients}
        </p>
        <p>
          <strong>Instructions:</strong> {recipe.instructions}
        </p>
        <p>
          <strong>Cuisine:</strong> {recipe.cuisine}
        </p>
        <p>
          <strong>Time:</strong> {recipe.prepTime} mins
        </p>
        <p>
          <strong>Category:</strong> {recipe.categories?.join(", ")}
        </p>
        <p>
          <strong>Likes:</strong> {recipe.likeCount}
        </p>
        <div className="flex justify-end gap-3 mt-4">
          <button className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white">
            Update
          </button>
          <button
            onClick={() => handleDelete(recipe._id)}
            className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyRecipesCard;
