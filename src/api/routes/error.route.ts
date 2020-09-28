import { Router } from "express";

import ErrorController from "@/api/controllers/error.controller";

export default (router: Router): void => {
  // 404
  router.use(ErrorController.notFound);
};
