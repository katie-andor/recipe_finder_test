// RecipeDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: { apiKey: API_KEY },
          }
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [id, API_KEY]);

  if (!recipe) return <p>Loading...</p>;

  // Split the instructions into an array based on periods and filter out empty strings
  const instructionsList = recipe.instructions
    ? recipe.instructions
        .split(".")
        .map((instruction) => instruction.trim())
        .filter((instruction) => instruction)
    : [];

  return (
    <div className="flex flex-row m-4 p-4 bg-white bg-opacity-[60%] rounded-xl border-solid border-[8px] border-[#4DB14A] text-black text-[24px] font-sour">
      <div>
        <h1 className="text-[60px] text-center text-black">{recipe.title}</h1>
        <img className="mr-auto ml-auto" src={recipe.image} alt={recipe.title} />
      </div>
      <div className="overflow-y-scroll h-[600px] m-4">
        <h2 className="text-[35px]">Ingredients:</h2>
        <ul>
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>

        <h2>Instructions:</h2>
        {instructionsList.length > 0 ? (
          <ul>
            {instructionsList.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        ) : (
          <p>No instructions available.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
