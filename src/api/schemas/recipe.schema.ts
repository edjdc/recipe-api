import { Request } from "express";
import Joi from "joi";

const getRecipe = (req: Request): Joi.ValidationResult => {
  const schema = Joi.object().keys({
    i: Joi.alternatives().try(Joi.array().items(Joi.string()).allow("").max(3), Joi.string()),
  });
  const query = { ...req.query };
  const { i } = query;
  if (i) {
    query.i = (i as string).split(",").filter((str) => str);
  }
  return schema.validate(query);
};

export default {
  getRecipe,
};
