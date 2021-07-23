FROM node:14-alpine as build

ARG NEXT_PUBLIC_STRAPI_API_URL
ENV NODE_ENV=production NEXT_PUBLIC_STRAPI_API_URL=$NEXT_PUBLIC_STRAPI_API_URL

WORKDIR /frontend

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --production --frozen-lockfile

COPY . .

RUN yarn build

FROM node:14-alpine

COPY --from=build /frontend /frontend

WORKDIR /frontend

ARG NEXT_PUBLIC_STRAPI_API_URL
ENV NODE_ENV=production API_URL=$NEXT_PUBLIC_STRAPI_API_URL

EXPOSE 3000

CMD yarn start