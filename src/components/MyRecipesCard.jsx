import React, { useState } from "react";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";

const MyRecipesCard = ({ recipe, myRecipes, setMyRecipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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

              // Update UI immediately
              setMyRecipes(myRecipes.filter((myRecipe) => myRecipe._id !== id));
            }
          });
      }
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedRecipe = {
      image: form.image.value,
      title: form.title.value,
      ingredients: form.ingredients.value,
      instructions: form.instructions.value,
      cuisine: form.cuisine.value,
      prepTime: Number(form.prepTime.value),
      categories: form.categories.value.split(","),
    };

    Swal.fire({
      title: "Update Recipe?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/recipes/${selectedRecipe._id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedRecipe),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire({
                title: "Updated!",
                text: "Recipe has been updated.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });

              // Update UI immediately
              setMyRecipes(
                myRecipes.map((recipe) =>
                  recipe._id === selectedRecipe._id
                    ? { ...recipe, ...updatedRecipe }
                    : recipe
                )
              );

              // Close modal and clear selection
              setSelectedRecipe(null);
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
          <button
            data-tooltip-id={`update-tooltip-${recipe._id}`}
            data-tooltip-content="Update Recipe"
            onClick={() => setSelectedRecipe(recipe)}
            className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Update ✏️
          </button>
          <button
            data-tooltip-id={`delete-tooltip-${recipe._id}`}
            data-tooltip-content="Delete Recipe"
            onClick={() => handleDelete(recipe._id)}
            className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
          >
            Delete 🗑️
          </button>
        </div>
      </div>

      {/* Tooltips */}
      <Tooltip id={`update-tooltip-${recipe._id}`} place="top" />
      <Tooltip id={`delete-tooltip-${recipe._id}`} place="top" />

      {selectedRecipe && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <form method="dialog" onSubmit={handleUpdate} className="modal-box">
            <h3 className="font-bold text-lg mb-4">Update Recipe</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <p className="text-xs text-gray-500 mb-1">
                Provide a link to an image of your dish.
              </p>
              <input
                type="text"
                name="image"
                defaultValue={selectedRecipe.image}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Recipe Title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={selectedRecipe.title}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Ingredients
              </label>
              <p className="text-xs text-gray-500 mb-1">
                Separate items with commas or list them line by line.
              </p>
              <textarea
                name="ingredients"
                defaultValue={selectedRecipe.ingredients}
                className="textarea textarea-bordered w-full"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Instructions
              </label>
              <p className="text-xs text-gray-500 mb-1">
                Provide step-by-step preparation instructions.
              </p>
              <textarea
                name="instructions"
                defaultValue={selectedRecipe.instructions}
                className="textarea textarea-bordered w-full"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Cuisine Type
              </label>
              <input
                type="text"
                name="cuisine"
                defaultValue={selectedRecipe.cuisine}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Preparation Time (in minutes)
              </label>
              <input
                type="number"
                name="prepTime"
                defaultValue={selectedRecipe.prepTime}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Categories
              </label>
              <p className="text-xs text-gray-500 mb-1">
                Separate multiple categories with commas (e.g., vegan, dessert).
              </p>
              <input
                type="text"
                name="categories"
                defaultValue={selectedRecipe.categories?.join(", ")}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="modal-action mt-6">
              <button type="submit" className="btn bg-green-500 text-white">
                Save
              </button>
              <button
                type="button"
                onClick={() => setSelectedRecipe(null)}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default MyRecipesCard;
