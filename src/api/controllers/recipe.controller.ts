import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import RecipeService from "@/services/recipe.service";

const getRecipes = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { i } = req.query;
    if (!i) {
      res.status(200).json({
        keywords: [],
        recipes: [],
      });
      return;
    }

    const ingredients = i as string;
    const ingredientsArray = ingredients.split(",").filter((str) => str);
    const recipes = await RecipeService.getRecipes({ ingredients });

    res.status(200).json({
      keywords: ingredientsArray,
      recipes,
    });
  },
);

export default {
  getRecipes,
};
