import { Application } from "express";

import expressLoader from "@/loaders/express";

export default (app: Application): void => {
  expressLoader(app);
};
