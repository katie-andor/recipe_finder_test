import React, { useState } from "react";
import { fetchRecipesByIngredients } from "./spoonacularService";
import { Link } from "react-router-dom";

function RecipeSearch() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const ingredientList = ingredients.split(",").map((item) => item.trim());
      const data = await fetchRecipesByIngredients(ingredientList);
      setRecipes(data);
      setError(null);
    } catch (err) {
      setError("Could not fetch recipes");
    }
  };

  return (
    <div className="flex flex-nowrap flex-row justify-start m-[3%] font-sour">
      <div className="top-0 left-0 w-[50%]">
        <div className="bg-[#4DB14A] rounded-xl">
          <h1 className="text-[90px] text-center text-white">Recipe Finder</h1>
        </div>
        <div className="mt-[5%]">
          <input
            className="w-full rounded-xl h-[5vw] border-solid border-[8px] border-[#4DB14A] text-black text-[24px]"
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients separated by commas"
          />
          <br />
          <button
            className="bg-[#4DB14A] text-white text-[30px] mt-[2%] rounded-xl p-4"
            onClick={handleSearch}
          >
            Search Recipes
          </button>
        </div>
      </div>
      <div className="ml-6 h-[600px] text-[30px] p-4 bg-white bg-opacity-[60%] w-full overflow-y-auto rounded-xl border-solid border-[8px] border-[#4DB14A]">
        {error && <p>{error}</p>}
        {recipes.length === 0 && !error ? (
          <p>No recipes found. Try searching for ingredients!</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="border rounded-xl p-4 bg-[#4DB14A]">
              <Link to={`/recipes/${recipe.id}`}>
                <h2 className="text-xl font-bold">{recipe.title}</h2>
                <img src={recipe.image} alt={recipe.title} className="w-full h-auto mt-2" />
              </Link>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeSearch;
