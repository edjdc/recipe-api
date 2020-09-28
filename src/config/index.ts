import { config } from "dotenv";

config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

export default {
  port: process.env.PORT || 3000,
  test: process.env.NODE_ENV = "test",
  api: {
    prefix: process.env.API_PREFIX || "/",
  },
};
