FROM node:16-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 8000
ENV PORT 8000

CMD [ "node", "./dist/index.js" ]
