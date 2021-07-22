FROM strapi/base:14-alpine

ENV NODE_ENV=production

RUN npm install --global pm2

WORKDIR /backend

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

CMD yarn start
