import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

const notFound = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.status(404).send("Not Found");
  },
);

export default {
  notFound,
};
