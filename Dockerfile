FROM node:lts-alpine

WORKDIR /app

ADD package.json /app

RUN npm install

ADD . /app

RUN npm run build

RUN npm install --global nodemon

CMD DB_HOST=postgres npx knex --knexfile /app/src/database/knexfile.ts migrate:latest && nodemon --ext ts --exec "npm run build && npm start" --watch ./src
