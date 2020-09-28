import express, { Application } from "express";

import routes from "@/api/routes";
import ErrorHandler from "@/middlewares/error-handler";
import config from "@/config";

export default (app: Application): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(config.api.prefix, routes());
  app.use(ErrorHandler);
};
