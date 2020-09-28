import "module-alias/register";
import express, { Express } from "express";

import AppLoader from "@/loaders";

const server = (): Express => {
  const app = express();

  AppLoader(app);

  return app;
};

export default server;
