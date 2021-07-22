FROM node:14-alpine as build

ARG NEXT_PUBLIC_STRAPI_API_URL
ENV NODE_ENV=production API_URL=$NEXT_PUBLIC_STRAPI_API_URL


WORKDIR /backend

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --production --frozen-lockfile

COPY favicon.ico .
COPY api api
COPY components components
COPY config config
COPY extensions extensions
COPY public/robots.txt public/

RUN yarn build

FROM node:14-alpine

COPY --from=build /backend /backend

WORKDIR /backend

ARG NEXT_PUBLIC_STRAPI_API_URL
ENV NODE_ENV=production API_URL=$NEXT_PUBLIC_STRAPI_API_URL

EXPOSE 1337

CMD yarn start
