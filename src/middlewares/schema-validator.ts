import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export type SchemaValidationOptions = {
  statusCode?: number;
};

export const defaultOptions = {
  statusCode: 400,
};

export default (
  schema: (req: Request) => Joi.ValidationResult,
  argOptions: SchemaValidationOptions = defaultOptions,
): ((req: Request, res: Response, next: NextFunction) => void | Response) => {
  const options = { ...defaultOptions, ...argOptions };
  return (req: Request, res: Response, next: NextFunction): void | Response => {
    const { error } = schema(req);
    if (!error) {
      return next();
    }
    const { details } = error;
    const message = details.map((i) => i.message).join(", ");
    return res.status(options.statusCode).json({ error: message });
  };
};
