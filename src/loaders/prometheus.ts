import { collectDefaultMetrics } from "prom-client";

import config from "@/config";

export default (): void => {
  if (!config.test) {
    collectDefaultMetrics();
  }
};
