import { NextFunction, Request, Response } from "express";
import winston from "winston";

import ResponseError from "@/utils/response-error";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: Error, req: Request, res: Response, next: NextFunction): void => {
  winston.log("error", err.message);

  if (err instanceof ResponseError) {
    res.statusCode = (err as ResponseError).Status();
    res.json({ error: (err as ResponseError).message });
    return;
  }

  res.statusCode = 500;
  res.json({ error: "Internal Server Error" });
};
