import winston from "winston";

import server from "@/server";
import config from "@/config";

server().listen(config.port, () => {
  winston.info(`Server running on port ${config.port}`);
});
