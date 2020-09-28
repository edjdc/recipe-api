import { Router } from "express";

import monitorRoutes from "@/api/routes/monitor.route";
import errorRoutes from "@/api/routes/error.route";

export default (): Router => {
  const router = Router();

  monitorRoutes(router);
  errorRoutes(router);

  return router;
};
