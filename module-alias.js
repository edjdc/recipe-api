/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-self-import */
const moduleAlias = require("module-alias");

if (process.env.NODE_ENV === "production") {
  moduleAlias.addAlias("@", `${__dirname}/dist`);
} else {
  moduleAlias.addAlias("@", `${__dirname}/src`);
}
