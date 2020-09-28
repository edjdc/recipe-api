import { Router } from "express";

import RecipeController from "@/api/controllers/recipe.controller";

export default (router: Router): void => {
  const recipeRouter = Router();
  recipeRouter.get("/", RecipeController.getRecipes);

  router.use("/recipes", recipeRouter);
};
