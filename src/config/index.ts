import { config } from "dotenv";

config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

export default {
  production: process.env.NODE_ENV === "production",
  test: process.env.NODE_ENV = "test",
  port: process.env.PORT || 3000,
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  api: {
    prefix: process.env.API_PREFIX || "/",
  },
  recipePuppy: {
    api: {
      url: process.env.RECIPE_PUPPY_API_URL || "http://www.recipepuppy.com/api",
    },
  },
};
