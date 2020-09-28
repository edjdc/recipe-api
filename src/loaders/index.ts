import { Application } from "express";

import expressLoader from "@/loaders/express";
import prometheusLoader from "@/loaders/prometheus";
import loggerLoader from "@/loaders/logger";

export default (app: Application): void => {
  expressLoader(app);
  prometheusLoader();
  loggerLoader();
};
