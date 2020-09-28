import { Request, Response } from "express";
import Prometheus from "prom-client";
import asyncHandler from "express-async-handler";

const getHealth = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
      status: "UP",
    });
  },
);

const getMetrics = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.set("Content-Type", Prometheus.register.contentType);
    res.end(Prometheus.register.metrics());
  },
);

export default {
  getHealth,
  getMetrics,
};
