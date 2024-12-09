from seedData.recipesList import recipiesList , recipeDetails

def get_recipes_by_ingredients( required_ingredients):
    
   
    required_ingredients = [ingredient.lower() for ingredient in required_ingredients]

    matching_recipes = []

    
    for recipe in recipiesList:
        
        used_ingredients = [ingredient.lower() for ingredient in recipe["usedIngredients"]]

        
        if any(ingredient in used_ingredients for ingredient in required_ingredients):
            matching_recipes.append(recipe)

    return matching_recipes
        



def get_recipe_by_id(id):
    # Search for the recipe by id
    for recipe in recipeDetails:
        if recipe["id"] == id:
            return recipe
    return None  # Return None if no recipe found



