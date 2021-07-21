FROM node:14-alpine

ENV NODE_ENV production

WORKDIR /frontend

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --production

COPY public public

RUN yarn build

EXPOSE 3000

CMD yarn start