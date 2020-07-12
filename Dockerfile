#######################
## STAGE development ##
#######################
FROM node:12.13.1-alpine3.10 as development
WORKDIR /app

#######################
## STAGE builder ##
#######################
FROM development as build
WORKDIR /app
COPY ./ /app/

RUN yarn install

ARG ENVFILE
RUN (echo $ENVFILE | base64 -d) > /app/.env ; cat /app/.env

RUN yarn build

#######################
## STAGE final ##
#######################
FROM nginx:1.17.8-alpine as final
COPY --from=build /app/build/ /usr/share/nginx/html
COPY /docker/rootfs/etc/nginx/conf.d/router.conf /etc/nginx/conf.d/default.conf