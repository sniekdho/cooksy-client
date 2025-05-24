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
        fetch(`https://cooksy-server-nine.vercel.app/recipes/${id}`, {
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
        fetch(
          `https://cooksy-server-nine.vercel.app/recipes/${selectedRecipe._id}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(updatedRecipe),
          }
        )
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
              form.reset();
              setSelectedRecipe(null);
            }
          });
      }
    });
  };

  return (
    <div className="card bg-base-100 shadow-md rounded-xl overflow-hidden transition hover:shadow-lg">
      <figure>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body text-base-content">
        <h2 className="card-title text-primary">{recipe.title}</h2>
        <p className="text-sm text-base-content/70">
          <strong className="text-secondary">Ingredients:</strong>{" "}
          {recipe.ingredients}
        </p>
        <p className="text-sm text-base-content/70">
          <strong className="text-secondary">Instructions:</strong>{" "}
          {recipe.instructions}
        </p>
        <p className="text-sm text-base-content/70">
          <strong className="text-secondary">Cuisine:</strong> {recipe.cuisine}
        </p>
        <p className="text-sm text-base-content/70">
          <strong className="text-secondary">Time:</strong> {recipe.prepTime}{" "}
          mins
        </p>
        <p className="text-sm text-base-content/70">
          <strong className="text-secondary">Category:</strong>{" "}
          {recipe.categories?.join(", ")}
        </p>
        <p className="text-sm text-base-content/70">
          <strong className="text-secondary">Likes:</strong> {recipe.likeCount}
        </p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            data-tooltip-id={`update-tooltip-${recipe._id}`}
            data-tooltip-content="Update Recipe"
            onClick={() => setSelectedRecipe(recipe)}
            className="btn btn-sm bg-secondary text-primary-content hover:bg-secondary-focus"
          >
            Update ✏️
          </button>
          <button
            data-tooltip-id={`delete-tooltip-${recipe._id}`}
            data-tooltip-content="Delete Recipe"
            onClick={() => handleDelete(recipe._id)}
            className="btn btn-sm bg-primary text-white hover:bg-primary-focus"
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
          <form
            method="dialog"
            onSubmit={handleUpdate}
            className="modal-box bg-base-300 text-base-content"
          >
            <h3 className="font-bold text-lg text-primary mb-4">
              Update Recipe
            </h3>

            <div>
              <label className="block text-sm font-medium text-secondary">
                Image URL
              </label>
              <p className="text-base-content/60 mb-1">
                Provide a link to an image of your dish.
              </p>
              <input
                type="text"
                name="image"
                defaultValue={selectedRecipe.image}
                className="input input-bordered w-full bg-base-200 text-base-content"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-secondary">
                Recipe Title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={selectedRecipe.title}
                className="input input-bordered w-full bg-base-200 text-base-content"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-secondary">
                Ingredients
              </label>
              <p className="text-xs text-base-content/60 mb-1">
                Separate items with commas or list them line by line.
              </p>
              <textarea
                name="ingredients"
                defaultValue={selectedRecipe.ingredients}
                className="textarea textarea-bordered w-full bg-base-200 text-base-content"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-secondary">
                Instructions
              </label>
              <p className="text-xs text-base-content/60 mb-1">
                Provide step-by-step preparation instructions.
              </p>
              <textarea
                name="instructions"
                defaultValue={selectedRecipe.instructions}
                className="textarea textarea-bordered w-full bg-base-200 text-base-content"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-secondary">
                Cuisine Type
              </label>
              <input
                type="text"
                name="cuisine"
                defaultValue={selectedRecipe.cuisine}
                className="input input-bordered w-full bg-base-200 text-base-content"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-secondary">
                Preparation Time (in minutes)
              </label>
              <input
                type="number"
                name="prepTime"
                defaultValue={selectedRecipe.prepTime}
                className="input input-bordered w-full bg-base-200 text-base-content"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-secondary">
                Categories
              </label>
              <p className="text-xs text-base-content/60 mb-1">
                Separate multiple categories with commas (e.g., vegan, dessert).
              </p>
              <input
                type="text"
                name="categories"
                defaultValue={selectedRecipe.categories?.join(", ")}
                className="input input-bordered w-full bg-base-200 text-base-content"
                required
              />
            </div>

            <div className="modal-action mt-6">
              <button
                type="submit"
                className="btn bg-accent hover:bg-accent-focus text-white"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setSelectedRecipe(null)}
                className="btn bg-base-200 text-base-content border border-primary hover:bg-primary hover:text-white"
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
