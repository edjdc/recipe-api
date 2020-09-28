import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import winston from "winston";
import morgan from "morgan";

import config from "@/config";
import routes from "@/api/routes";
import ErrorHandler from "@/middlewares/error-handler";

class LoggerStream {
  write = (message: string) => {
    winston.info(message.substring(0, message.lastIndexOf("\n")));
  };
}

export default (app: Application): void => {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan("combined", { stream: new LoggerStream() }));
  app.use(config.api.prefix, routes());
  app.use(ErrorHandler);
};
