import RecipePuppyClient, { RecipePuppy } from "@/clients/recipe-puppy.client";

export type RecipeFilter = {
  ingredients: string;
};

export type Recipe = {
  title: string;
  ingredients: string[];
  link: string;
};

const getRecipes = async (filter: RecipeFilter): Promise<Array<Recipe>> => {
  const recipesPuppy = await RecipePuppyClient.getRecipes({ i: filter.ingredients });

  const recipes = recipesPuppy.map((recipe: RecipePuppy) => {
    return {
      title: recipe.title,
      ingredients: recipe.ingredients.split(",").sort(),
      link: recipe.href,
    };
  }) as Array<Recipe>;

  return recipes;
};

export default {
  getRecipes,
};
