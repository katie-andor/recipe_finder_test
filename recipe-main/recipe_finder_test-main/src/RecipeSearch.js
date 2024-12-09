import React, { useState } from 'react';
import { fetchRecipesByIngredients } from './spoonacularService';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function RecipeSearch() {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            
            const ingredientList = ingredients.split(',').map(item => item.trim());
            const data = await fetchRecipesByIngredients(ingredientList);
            setRecipes(data);
            setError(null); 
        } catch (err) {
            setError('Could not fetch recipes');
        }
    };

    return (
        <div>
            <h1>Recipe Finder</h1>
            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter ingredients separated by commas"
            />
            <button onClick={handleSearch}>Search Recipes</button>

            {error && <p>{error}</p>}
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <Link to={`/recipes/${recipe.id}`}> {/* Link to recipe details page */}
                            <h2>{recipe.title}</h2>
                            <img src={recipe.image} alt={recipe.title} width="100" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecipeSearch;
