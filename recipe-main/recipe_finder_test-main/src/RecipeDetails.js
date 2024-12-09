// RecipeDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
    const { id } = useParams(); // Get the recipe ID from the URL
    const [recipe, setRecipe] = useState(null);
    const BASE_URL = 'http://localhost:5000'

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/recipes/${id}`);
                setRecipe(response.data);
            } catch (error) {
                console.error("Error fetching recipe details:", error);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    if (!recipe) return <p>Loading...</p>;

    // Split the instructions into an array based on periods and filter out empty strings
    const instructionsList = recipe.instructions ? recipe.instructions.map((item) => item.trim()) : [];

    return (
        <div>
            <h1>{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} />
            <h2>Ingredients:</h2>
            <ul>
                {recipe.ingredients.map((ingredient ,index) => (
                    <li key={index}>{ingredient}</li>
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
