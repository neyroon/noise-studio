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

RUN ls
RUN yarn build

EXPOSE 3000

CMD yarn start