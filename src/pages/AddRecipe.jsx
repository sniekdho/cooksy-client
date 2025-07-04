import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const AddRecipe = () => {
  const { user } = useContext(AuthContext);

  const handleAddRecipe = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const image = formData.get("image");
    const title = formData.get("title");
    const ingredients = formData.get("ingredients");
    const instructions = formData.get("instructions");
    const cuisine = formData.get("cuisine");
    const prepTime = formData.get("prepTime");
    const likeCount = 0;

    const categories = formData.getAll("categories");

    const recipe = {
      image,
      title,
      ingredients,
      instructions,
      cuisine,
      prepTime: Number(prepTime),
      categories,
      likeCount,
      email: user?.email,
      name: user?.displayName,
      photo: user?.photoURL,
      createdAt: new Date(),
    };

    Swal.fire({
      title: "Do you want to add the recipe?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Add",
      denyButtonText: `Don't add`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetch("https://cooksy-server-nine.vercel.app/recipes", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(recipe),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "Recipe Added!",
                timer: 1500,
                showConfirmButton: false,
              });
              form.reset();
            }
          });
      } else if (result.isDenied) {
        Swal.fire("Denied", "", "info");
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 mb-20 bg-base-100 shadow-md rounded-xl mt-10">
      <h2 className="text-3xl font-semibold mb-2 text-center text-primary">
        Add New Recipe
      </h2>
      <p className="text-center text-base-content/70 mb-8">
        Share your favorite recipe with the community!
      </p>
      <form onSubmit={handleAddRecipe}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-base-content">
              Image URL
            </label>
            <p className="text-xs text-base-content/70 mb-1">
              Provide a link to an image of your dish.
            </p>
            <input
              type="text"
              name="image"
              className="input input-bordered w-full bg-base-200 text-base-content"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-base-content">
              Recipe Title
            </label>
            <p className="text-xs text-base-content/70 mb-1">
              Give your recipe a catchy title.
            </p>
            <input
              type="text"
              name="title"
              className="input input-bordered w-full bg-base-200 text-base-content"
              placeholder="Delicious Pasta"
              required
            />
          </div>

          {/* Ingredients */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-base-content">
              Ingredients
            </label>
            <p className="text-xs text-base-content/70 mb-1">
              List all ingredients, separated by commas.
            </p>
            <textarea
              name="ingredients"
              placeholder="Tomatoes, Basil, Garlic, Olive Oil"
              className="textarea textarea-bordered w-full bg-base-200 text-base-content"
              rows="3"
              required
            />
          </div>

          {/* Instructions */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-base-content">
              Instructions
            </label>
            <p className="text-xs text-base-content/70 mb-1">
              Describe the preparation steps in detail.
            </p>
            <textarea
              name="instructions"
              placeholder="1. Boil water...\n2. Add pasta..."
              className="textarea textarea-bordered w-full bg-base-200 text-base-content"
              rows="4"
              required
            />
          </div>

          {/* Cuisine Type */}
          <div>
            <label className="block text-sm font-medium text-base-content">
              Cuisine Type
            </label>
            <p className="text-xs text-base-content/70 mb-1">
              Select the cuisine category.
            </p>
            <select
              name="cuisine"
              className="select select-bordered w-full bg-base-200 text-base-content"
              required
            >
              <option value="">Select Cuisine</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Preparation Time */}
          <div>
            <label className="block text-sm font-medium text-base-content">
              Preparation Time (minutes)
            </label>
            <p className="text-xs text-base-content/70 mb-1">
              How long does it take to prepare this dish?
            </p>
            <input
              type="number"
              name="prepTime"
              className="input input-bordered w-full bg-base-200 text-base-content"
              placeholder="30"
              min="1"
              required
            />
          </div>

          {/* Categories */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-base-content">
              Categories
            </label>
            <p className="text-xs text-base-content/70 mb-1">
              Select all applicable categories.
            </p>
            <div className="flex flex-wrap gap-4">
              {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map(
                (category) => (
                  <label key={category} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="categories"
                      value={category}
                      className="checkbox bg-base-200 text-base-content"
                    />
                    <span>{category}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Like Count */}
          <div>
            <label className="block text-sm font-medium text-base-content">
              Like Count
            </label>
            <p className="text-xs text-base-content/70 mb-1">
              Initial like count (read-only).
            </p>
            <input
              type="number"
              name="likeCount"
              value={0}
              readOnly
              className="input input-bordered w-full bg-base-200 text-base-content cursor-not-allowed"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn w-full mt-6 text-primary-content bg-primary hover:bg-primary-focus hover:text-primary-content"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
