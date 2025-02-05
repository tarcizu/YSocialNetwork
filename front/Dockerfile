FROM node:22-alpine AS build-stage
WORKDIR /usr/app
COPY . .
RUN npm i
RUN npm run build


FROM nginx:alpine
COPY --from=build-stage /usr/app/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-stage /usr/app/build .
