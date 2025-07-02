# From https://github.com/remix-run/react-router-templates/blob/main/default/Dockerfile
# 4 separate jobs to take advantage of docker caching.

# install all dependencies in separate container
FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

# install prod dependencies in separate container
FROM node:20-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

# build app in separate container
FROM node:20-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

# copy dependencies and build to final container
FROM node:20-alpine
RUN apk --no-cache add curl
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
EXPOSE 80
CMD ["npm", "run", "start"]