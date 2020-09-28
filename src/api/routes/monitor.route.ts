import { Router } from "express";

import MonitorController from "@/api/controllers/monitor.controller";

export default (router: Router): void => {
  // health
  router.get("/health", MonitorController.getHealth);
  // metrics
  router.get("/metrics", MonitorController.getMetrics);
};
