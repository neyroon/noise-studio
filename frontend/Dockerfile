FROM node:14-alpine

ENV NODE_ENV production

WORKDIR /frontend

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN yarn install --production

COPY .next .next
COPY public public

EXPOSE 3000

CMD yarn start