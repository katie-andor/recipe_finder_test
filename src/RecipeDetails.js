// RecipeDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
    const { id } = useParams(); // Get the recipe ID from the URL
    const [recipe, setRecipe] = useState(null);
    const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY; // Use the same API key from your environment variables

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
                    params: { apiKey: API_KEY }
                });
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
        ? recipe.instructions.split('.').map(instruction => instruction.trim()).filter(instruction => instruction) 
        : [];

    return (
        <div>
            <h1>{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} />
            <h2>Ingredients:</h2>
            <ul>
                {recipe.extendedIngredients.map(ingredient => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                ))}
            </ul>
            <h2>Instructions:</h2>
            {/* Render instructions as a bullet list */}
            {instructionsList.length > 0 ? (
                <ul>
                    {instructionsList.map((instruction, index) => (
                        <li key={index}>{instruction}</li> // Use index as the key for simple mapping
                    ))}
                </ul>
            ) : (
                <p>No instructions available.</p>
            )}
        </div>
    );
};

export default RecipeDetails;
