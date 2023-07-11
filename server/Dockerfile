FROM node:16-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . /app

ENV JWT_SECRET=secret

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]
