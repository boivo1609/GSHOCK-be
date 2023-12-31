FROM node:8-alpine

EXPOSE 3000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /app
WORKDIR /app
ADD package.json /app/
RUN npm run --pure-lockfile
ADD . /app

CMD ["npm","run", "docker:start"]
