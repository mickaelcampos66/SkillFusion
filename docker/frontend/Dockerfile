FROM node:22.11.0-alpine3.20 AS base

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable yarn
WORKDIR /app

# Development
FROM base AS dev
ENV APP_ENV=development
COPY . .
EXPOSE 3000
CMD [ "yarn", "dev" ]

# Deps stage
FROM base AS deps
COPY ./package.json ./yarn.lock ./
RUN [ "yarn", "install", "--immutable" ]
COPY --chown=node:node . .

# CI stage
FROM deps AS test
ENV APP_ENV=test

# Production server
FROM deps AS prod
ENV APP_ENV=production
RUN cp ./entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/bin/sh", "/entrypoint.sh" ]
