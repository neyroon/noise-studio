FROM strapi/base:14

ENV NODE_ENV production

WORKDIR /backend

COPY package.json .

COPY yarn.lock .

RUN yarn install –frozen-lockfile

COPY favicon.ico .

COPY public/robots.txt public/

COPY extensions/ extensions/

COPY exports/ exports/

COPY api/ api/

COPY components/ components/

COPY config/ config/

EXPOSE 1337

CMD ["yarn", "start"]
