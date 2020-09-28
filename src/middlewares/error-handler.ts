import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: Error, req: Request, res: Response, next: NextFunction): void => {
  res.statusCode = 500;
  res.json({ error: "Internal Server Error" });
};
