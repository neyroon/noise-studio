FROM node:14-alpine

ENV NODE_ENV=production

WORKDIR /frontend

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --production --frozen-lockfile

COPY components components
COPY public public
COPY pages pages
COPY styles styles
COPY utils utils

COPY next.config.js next.config.js
COPY postcss.config.js postcss.config.js
COPY tailwind.config.js tailwind.config.js

RUN yarn build

EXPOSE 3000

CMD yarn start