import express, { Application, Request, Response } from "express";

export default (app: Application): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      status: "UP",
    });
  });
};
