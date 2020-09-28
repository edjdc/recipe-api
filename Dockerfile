# Build Stage 1
FROM node:12 AS builder

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
COPY --chown=node:node . .
RUN yarn build

# Build Stage 2
FROM node:12

COPY --from=builder /usr/src/app .

ENV NODE_ENV=production

USER node

EXPOSE 8080

CMD [ "node", "-r", "./module-alias.js", "dist/index.js" ]
