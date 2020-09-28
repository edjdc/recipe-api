import { Router } from "express";

import RecipeController from "@/api/controllers/recipe.controller";
import SchemaValidator from "@/middlewares/schema-validator";
import RecipeSchema from "@/api/schemas/recipe.schema";

export default (router: Router): void => {
  const recipeRouter = Router();
  recipeRouter.get("/", SchemaValidator(RecipeSchema.getRecipe), RecipeController.getRecipes);

  router.use("/recipes", recipeRouter);
};
