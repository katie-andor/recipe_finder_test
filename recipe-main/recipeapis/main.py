from flask import Flask, request, jsonify
from recipeService import get_recipes_by_ingredients , get_recipe_by_id
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# In-memory data store for simplicity
items = []

CORS(app)

@app.route('/')
def home():
    return "Welcome to the CRUD API!"




@app.route('/findByIngredients', methods=['GET'])
def get_recipes():
    
    
    ingredients = request.args.get('ingredients')

    if not ingredients:
        return jsonify({"error": "No ingredients provided"}), 400

    ingredients_list = ingredients.split(',')

   
    matching_recipes = get_recipes_by_ingredients(ingredients_list)

    if not matching_recipes:
        return jsonify({"message": "No recipes found with the provided ingredients."}), 404

    return jsonify(matching_recipes)



@app.route('/recipes/<int:id>', methods=['GET'])
def get_item(id):
    # Fetch the recipe by id
    recipe = get_recipe_by_id(id)

    # If no recipe is found, return a 404 error
    if not recipe:
        return jsonify({'error': 'Item not found'}), 404

    # Return the recipe as JSON
    return jsonify(recipe)

if __name__ == '__main__':
    app.run(debug=True)