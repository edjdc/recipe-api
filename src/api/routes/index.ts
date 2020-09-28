import { Router } from "express";

import recipeRoutes from "@/api/routes/recipe.route";
import monitorRoutes from "@/api/routes/monitor.route";
import errorRoutes from "@/api/routes/error.route";

export default (): Router => {
  const router = Router();

  recipeRoutes(router);
  monitorRoutes(router);
  errorRoutes(router);

  return router;
};
