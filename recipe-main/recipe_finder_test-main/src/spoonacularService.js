import axios from 'axios';

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

const BASE_URL = 'http://localhost:5000';


export const fetchRecipesByIngredients = async (ingredients) => {

  console.log(API_KEY)
  try {
    const response = await axios.get(`${BASE_URL}/findByIngredients`, {
      params: {
        ingredients: ingredients.join(','), 
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};
