FROM strapi/base:14-alpine

ENV NODE_ENV=production

WORKDIR /backend

RUN yarn global add pm2

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --production

COPY favicon.ico .
COPY api api
COPY components components
COPY config config
COPY extensions extensions
COPY public/robots.txt public/

RUN yarn build

EXPOSE 1337

CMD [ "pm2-runtime", "start", "yarn", "--", "start" ]
