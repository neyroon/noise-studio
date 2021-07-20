FROM strapi/base:14-alpine

ENV NODE_ENV production

WORKDIR /backend

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --production

COPY .cache .cache
COPY build build

EXPOSE 1337

CMD ["yarn", "start"]
