import { Application } from "express";

import expressLoader from "@/loaders/express";
import prometheusLoader from "@/loaders/prometheus";

export default (app: Application): void => {
  expressLoader(app);
  prometheusLoader();
};
