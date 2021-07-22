FROM node:14-alpine

ENV NODE_ENV=production

WORKDIR /frontend

RUN yarn global add pm2

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --production

COPY components components
COPY public public
COPY pages pages
COPY styles styles
COPY utils utils

RUN yarn build

EXPOSE 3000

CMD [ "pm2-runtime", "start", "yarn", "--", "start" ]