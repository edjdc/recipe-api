import RecipePuppyClient, { RecipePuppy } from "@/clients/recipe-puppy.client";
import GiphyClient from "@/clients/giphy.client";

export type RecipeFilter = {
  ingredients: string;
};

export type Recipe = {
  title: string;
  ingredients: string[];
  link: string;
  gif: string;
};

const getRecipes = async (filter: RecipeFilter): Promise<Array<Recipe>> => {
  const recipesPuppy = await RecipePuppyClient.getRecipes({ i: filter.ingredients });

  const recipes = (await Promise.all(
    recipesPuppy.map(async (recipe: RecipePuppy) => {
      const gifs = await GiphyClient.getGifs({ q: recipe.title, limit: 1 });
      const { data } = gifs;
      const gif = Array.isArray(data) && data.length ? data[0].images.original.url : "";
      return {
        title: recipe.title,
        ingredients: recipe.ingredients.split(",").sort(),
        link: recipe.href,
        gif,
      };
    }),
  )) as Array<Recipe>;

  return recipes;
};

export default {
  getRecipes,
};
