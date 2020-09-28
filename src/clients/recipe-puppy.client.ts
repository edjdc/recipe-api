import axios from "axios";
import winston from "winston";

import config from "@/config";
import ResponseError from "@/utils/response-error";

export type RecipePuppy = {
  title: string;
  ingredients: string;
  href: string;
};

export type RecipePuppyResponse = {
  results: Array<RecipePuppy>;
};

export type RecipePuppyFilter = {
  i: string;
};

const getRecipes = async (filter: RecipePuppyFilter): Promise<Array<RecipePuppy>> => {
  try {
    const response = await axios.get<RecipePuppyResponse>(config.recipePuppy.api.url, {
      params: { ...filter },
    });
    return response.data.results;
  } catch (err) {
    winston.debug(err.message);
    throw new ResponseError("RecipePuppy API request failed");
  }
};

export default {
  getRecipes,
};
