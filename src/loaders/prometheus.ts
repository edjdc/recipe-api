import { collectDefaultMetrics } from "prom-client";

export default (): void => {
  collectDefaultMetrics();
};
