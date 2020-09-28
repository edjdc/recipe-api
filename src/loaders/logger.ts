import winston from "winston";

import config from "@/config";

export default (): void => {
  const logger = winston.createLogger({
    level: config.logs.level,
    format: winston.format.json(),
    transports: [
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    ],
  });
  winston.add(logger);
};
